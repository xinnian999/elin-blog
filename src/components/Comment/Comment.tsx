"use client";

import { BrowserIcon, LikeIcon, RegionIcon } from "@/icons";
import { useDayjs, useMessage, useMounted } from "@/hooks";
import Image from "next/image";
import Write from "./Write";
import { Comment as CommentEntity } from "@/db";
import { useMemo, useState } from "react";
import { useMount } from "ahooks";
import useStore from "@/store";
import classNames from "classnames";
import { getOsIcon } from "./utils";
import commentApi from "@/api/comment";
import { likeComment, replyComment } from "@/services";

interface Props extends CommentEntity {
  replyTarget: CommentEntity | null;
  setReplyTarget: (data: CommentEntity | null) => void;
  refreshList: () => void;
}

const Comment = (props: Props) => {
  const { replyTarget, setReplyTarget, refreshList, type } = props;

  const mounted = useMounted();

  const dayjs = useDayjs();

  const [expand, setExpand] = useState(false);

  const { likeCommentIds, addLikeComment } = useStore();

  const message = useMessage();

  const handleReplay = () => {
    if (props.id === replyTarget?.id) {
      return setReplyTarget(null);
    }
    setReplyTarget(props);
  };

  const onChangeExpand = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpand(e.target.checked);
  };

  const handleScrollToComment = (id?: number) => {
    if (!id) return;
    const commentElement = document.getElementById(id.toString());
    if (commentElement) {
      commentElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleLike = async (id = props.id!) => {
    if (likeCommentIds.includes(id)) {
      message.info("已经点过赞啦");
      return;
    }

    await likeComment(id);

    addLikeComment(id);

    refreshList();
  };

  useMount(() => {
    const params = new URLSearchParams(window.location.search);

    const target = params.get("target");

    if (target) {
      props.replies?.forEach((item) => {
        if (item.id === Number(target)) {
          setExpand(true);
        }
      });
    }
  });

  const firstReply = props.replies?.[0];

  const isAdmin = useMemo(() => {
    return props.email === "3307578337@qq.com";
  }, [props.email]);

  return (
    <div className="py-4" id={props.id!.toString()}>
      <div className="flex gap-3 md:gap-4">
        <div className="">
          <div className="avatar">
            <div className="w-10 md:w-14">
              {mounted && (
                <Image src={props.avatar} fill alt="" className="rounded-xl" />
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 gap-1 flex flex-col ">
          <div className="flex justify-between text-[14px]">
            <div className="flex gap-3 items-center text-gray-500">
              <div className="flex gap-2 items-center">
                {props.nickname}
                {isAdmin && (
                  <div className="badge badge-primary badge-sm">博主</div>
                )}
              </div>

              <div>{dayjs(props.created_at).fromNow()}</div>
            </div>

            <div className="flex items-center gap-3 text-gray-500 lg:gap-4">
              <span
                className={classNames(
                  "cursor-pointer flex items-center gap-1 hover:text-success",
                  {
                    "text-success": likeCommentIds.includes(props.id!),
                  }
                )}
                onClick={() => handleLike()}
              >
                <LikeIcon className="w-4 h-4" /> {props.likes}
              </span>

              <span className="action-text" onClick={handleReplay}>
                {replyTarget && props.id === replyTarget.id ? "取消" : "回复"}
              </span>
            </div>
          </div>

          <div className="my-2">
            <div className="whitespace-pre-wrap">{props.content}</div>

            {props.targetComment &&
              props.targetComment.id !== props.parentComment?.id && (
                <div className="mt-1 text-[14px]">
                  <b
                    className="link-text"
                    onClick={() =>
                      handleScrollToComment(props.targetComment?.id)
                    }
                  >
                    —— {props.targetComment.nickname}：{" "}
                    {props.targetComment.content}
                  </b>{" "}
                </div>
              )}
          </div>

          {/* 位置/浏览器/操作系统 */}
          {(props.region || props.browser || props.os) && (
            <div className="text-gray-500 flex gap-x-3 items-center flex-wrap text-xs">
              {props.region && (
                <div className="flex items-center gap-[2px]">
                  <RegionIcon className="w-3 h-3" /> {props.region.slice(0, -1)}
                </div>
              )}

              {props.os && (
                <div className="flex items-center gap-[2px]">
                  {getOsIcon(props.os)}
                  {props.os}
                </div>
              )}

              {props.browser && (
                <div className="flex items-center gap-1">
                  <BrowserIcon className="w-3 h-3" /> {props.browser}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {replyTarget && props.id === replyTarget.id && (
        <div className="mt-3 lg:pl-14">
          <div className="bg-base-300 p-4 rounded">
            <Write
              id={props.id}
              placeholder={`回复 ${replyTarget.nickname}`}
              publishCallback={async ({ avatar, nickname, content, email }) => {
                await replyComment({
                  parentCommentId:
                    replyTarget.parentComment?.id || replyTarget.id,
                  targetCommentId: replyTarget.id!,
                  payload: {
                    avatar,
                    nickname,
                    content,
                    type,
                    email,
                  },
                });

                refreshList();
              }}
            />
          </div>
        </div>
      )}

      {firstReply ? (
        <div className="mt-3 lg:pl-14">
          <div className="collapse bg-base-200">
            <input
              style={{ width: "50%" }}
              type="checkbox"
              onChange={onChangeExpand}
              checked={expand}
            />
            <div className="collapse-title text-xs font-medium">
              {!expand && (
                <div className="flex justify-between">
                  <div>
                    <span>{firstReply.nickname}：</span>{" "}
                    <span>{firstReply.content}</span>
                  </div>
                  {
                    <span
                      className={classNames(
                        "action-text flex items-center gap-1",
                        {
                          "text-success": likeCommentIds.includes(
                            firstReply.id!
                          ),
                        }
                      )}
                      onClick={() => handleLike(firstReply.id)}
                    >
                      <LikeIcon className="w-4 h-4" /> {firstReply.likes}
                    </span>
                  }
                </div>
              )}
              <div className="mt-3 text-blue-600">
                {expand ? "收起回复" : `展开全部${props.replies!.length}条回复`}
              </div>
            </div>
            <div className="collapse-content">
              <div className="bg-base-200 rounded divide-y">
                {props.replies?.map((item) => {
                  return (
                    <Comment
                      {...item}
                      refreshList={refreshList}
                      replyTarget={replyTarget}
                      setReplyTarget={setReplyTarget}
                      key={item.id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Comment;
