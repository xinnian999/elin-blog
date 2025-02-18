"use client";

import { ReplyIcon } from "@/components";
import { replyComment } from "@elin-blog/db";
import { useDayjs, useMounted } from "@/hooks";
import Image from "next/image";
import Write from "./Write";
import { Comment as CommentEntity } from "@elin-blog/db";
import { useBoolean } from "ahooks";

interface Props extends CommentEntity {
  replyTarget: CommentEntity | null;
  setReplyTarget: (data: CommentEntity | null) => void;
  refreshList: () => void;
}

const Comment = (props: Props) => {
  const { replyTarget, setReplyTarget, refreshList, type } = props;

  const mounted = useMounted();

  const dayjs = useDayjs();

  const [expand, { toggle }] = useBoolean(false);

  const handleReplay = () => {
    if (props.id === replyTarget?.id) {
      return setReplyTarget(null);
    }
    setReplyTarget(props);
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

          {props.targetComment && (
            <div className="mt-2 text-[14px] text-gray-500">
              回复 {props.targetComment.nickname} ：
            </div>
          )}

          <div className="mt-2">{props.content}</div>
        </div>
      </div>

      {replyTarget && props.id === replyTarget.id && (
        <div className="pl-14">
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
      )}

      {/* {props.replies?.length ? (
        <div className="pl-14">
          <button className="btn btn-sm btn-ghost mb-1">查看{props.replies.length}条回复</button>
          <div className="bg-base-200 rounded p-2 divide-y">
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
      ) : null} */}
      {props.replies?.length ? (
        <div className="pl-14">
          <div className="collapse bg-base-200 ">
            <input type="checkbox" />
            <div className="collapse-title text-xs font-medium min-h-0">
              查看{props.replies.length}条回复
            </div>
            <div className="collapse-content">
              <div className="bg-base-200 rounded p-2 divide-y">
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
