"use client";

import { Card } from "@/components";
import { createComment, fetchCommentList } from "@/db/service/comment";
import { useRequest } from "ahooks";
import Write from "./Write";
import { useState } from "react";
import Comment from "./Comment";
import { Comment as CommentEntity } from "@/db";

const CommentBar = () => {
  const { data = [], run } = useRequest(fetchCommentList);
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

      <div className="mt-10">
        {data.map((item) => {
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
