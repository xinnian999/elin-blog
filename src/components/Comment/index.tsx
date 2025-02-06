"use client";

import { Card } from "@/components";
import { createComment, fetchCommentList } from "@/db/service/comment";
import { useRequest } from "ahooks";
import Write from "./Write";
import { useState } from "react";
import Comment from "./Comment";
import { Comment as CommentEntity } from "@/db";

const CommentBar = () => {
  const { data = [], run, loading } = useRequest(fetchCommentList);
  // console.log(data)

  const [replyTarget, setReplyTarget] = useState<CommentEntity | null>(null);

  const refreshList = () => {
    run();
    setReplyTarget(null);
  };

  return (
    <Card>
      <Write
        publishCallback={async ({ avatar, nickname, content }) => {
          await createComment({
            avatar,
            nickname,
            content,
          });

          refreshList();
        }}
      />

      <div className="divider"></div>

      <div>共{data.length}条留言</div>

      <div className="mt-8 flex flex-col gap-5">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex w-full flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                  <div className="flex flex-col  flex-1 gap-4">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>
                </div>
              </div>
            ))
          : data.map((item) => {
              return (
                <Comment
                  {...item}
                  refreshList={refreshList}
                  replyTarget={replyTarget}
                  setReplyTarget={setReplyTarget}
                  key={item.id}
                ></Comment>
              );
            })}
      </div>
    </Card>
  );
};

export default CommentBar;
