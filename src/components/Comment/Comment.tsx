"use client";

import { ReplyIcon } from "@/components";
import { replyComment } from "@/db/service/comment";
import { useDayjs, useMounted } from "@/hooks";
import Image from "next/image";
import Write from "./Write";
import { Comment as CommentEntity } from "@/db";

interface Props extends CommentEntity {
  replyTarget: number;
  setReplyTarget: (id: number) => void;
  refreshList: () => void;
}

const Comment = (props: Props) => {
  const { replyTarget, setReplyTarget, refreshList } = props;

  const mounted = useMounted();

  const dayjs = useDayjs();

  const handleReplay = (id: number) => {
    if (replyTarget === id) {
      setReplyTarget(-1);
    } else {
      setReplyTarget(id);
    }
  };

  return (
    <div>
      <div className="flex gap-5 mt-4">
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
            <div className="flex gap-3">
              <div className="">{props.nickname}</div>

              <div className="">{dayjs(props.created_at).fromNow()}</div>
            </div>

            <div>
              <span
                className="cursor-pointer hover:text-primary"
                onClick={handleReplay.bind(this, props.id!)}
              >
                <ReplyIcon />
              </span>
            </div>
          </div>

          <div className="mt-3">{props.content}</div>
        </div>
      </div>

      <div className="pl-14">
        {props.replies?.map((item) => {
          return (
            <Comment
              {...item}
              refreshList={refreshList}
              replyTarget={replyTarget}
              setReplyTarget={() => setReplyTarget(props.id!)}
              key={item.id}
            />
          );
        })}
      </div>

      {props.id === replyTarget && (
        <div className="pl-14">
          <Write
            publishCallback={async ({ avatar, nickname, content }) => {
              await replyComment(replyTarget, {
                avatar,
                nickname,
                content,
              });

              refreshList();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Comment;
