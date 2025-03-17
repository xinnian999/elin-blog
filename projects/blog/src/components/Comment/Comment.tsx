"use client";

import { LikeIcon } from "@elin-blog/icons";
import { likeComment, replyComment } from "@elin-blog/db";
import { useDayjs, useMessage, useMounted } from "@/hooks";
import Image from "next/image";
import Write from "./Write";
import { Comment as CommentEntity } from "@elin-blog/db";
import { useState } from "react";
import { useMount } from "ahooks";
import useGlobalStore from "@/store/global";
import classNames from "classnames";

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

  const { likeCommentIds, addLikeComment } = useGlobalStore();

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

  return (
    <div className="p-4" id={props.id!.toString()}>
      <div className="flex gap-4">
        <div className="">
          <div className="avatar">
            <div className="w-14">
              {mounted && (
                <Image src={props.avatar} fill alt="" className="rounded-xl" />
              )}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-[14px]">
            <div className="flex gap-3 items-center">
              <div className="font-bold">{props.nickname}</div>

              <div className="text-gray-500">
                {dayjs(props.created_at).fromNow()}
              </div>
            </div>
          </div>

          <div className="mt-2">{props.content}</div>

          {props.targetComment &&
            props.targetComment.id !== props.parentComment?.id && (
              <div className="mt-2 text-[14px]">
                <b
                  className="link-text"
                  onClick={() => handleScrollToComment(props.targetComment?.id)}
                >
                  —— {props.targetComment.nickname}：{" "}
                  {props.targetComment.content}
                </b>{" "}
              </div>
            )}

          <div className="mt-2 flex items-center gap-4">
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
      </div>

      {replyTarget && props.id === replyTarget.id && (
        <div className="mb-3 mt-2  lg:pl-14">
          <div className="bg-base-300 p-4 rounded">
            <Write
              id={props.id}
              placeholder={`回复 ${replyTarget.nickname}`}
              publishCallback={async ({ avatar, nickname, content, email }) => {
                await replyComment({
                  parentCommentId:
                    replyTarget.parentComment?.id || replyTarget.id,
                  targetCommentId: replyTarget.id!,
                  params: {
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
        <div className="lg:pl-14">
          <div className="collapse bg-base-200 mt-3">
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
