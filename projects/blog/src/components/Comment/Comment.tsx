"use client";

import { ReplyIcon } from "@elin-blog/icons";
import { replyComment } from "@elin-blog/db";
import { useDayjs, useMounted } from "@/hooks";
import Image from "next/image";
import Write from "./Write";
import { Comment as CommentEntity } from "@elin-blog/db";
import { useState } from "react";

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

  const handleReplay = () => {
    if (props.id === replyTarget?.id) {
      return setReplyTarget(null);
    }
    setReplyTarget(props);
  };

  const onChangeExpand = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpand(e.target.checked);
  };

  return (
    <div className="p-4">
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

            <div>
              <span
                className="cursor-pointer hover:text-primary"
                onClick={handleReplay}
              >
                <ReplyIcon />
              </span>
            </div>
          </div>

          {props.targetComment &&
            props.targetComment.id !== props.parentComment?.id && (
              <div className="mt-2 text-[14px] text-gray-500">
                回复 {props.targetComment.nickname} ：
              </div>
            )}

          <div className="mt-2">{props.content}</div>
        </div>
      </div>

      {replyTarget && props.id === replyTarget.id && (
        <div className="mb-3 mt-5  pl-14">
          <div className="bg-base-300 p-4 rounded">
            <Write
              placeholder={`回复 ${replyTarget.nickname}`}
              publishCallback={async ({ avatar, nickname, content }) => {
                await replyComment({
                  parentCommentId:
                    replyTarget.parentComment?.id || replyTarget.id,
                  targetCommentId: replyTarget.id!,
                  params: {
                    avatar,
                    nickname,
                    content,
                    type,
                  },
                });

                refreshList();
              }}
            />
          </div>
        </div>
      )}

      {props.replies?.length ? (
        <div className="pl-14">
          <div className="collapse bg-base-200 mt-3">
            <input type="checkbox" onChange={onChangeExpand} />
            <div className="collapse-title text-xs font-medium">
              {!expand && (
                <div>
                  <span>{props.replies[0].nickname}：</span>{" "}
                  <span>{props.replies[0].content}</span>
                </div>
              )}
              <div className="mt-3 text-blue-600">
                {expand ? "收起回复" : `展开全部${props.replies.length}条回复`}
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
