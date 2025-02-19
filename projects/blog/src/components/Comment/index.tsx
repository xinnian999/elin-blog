"use client";

import { Card } from "@/components";
import { createComment, fetchCommentList } from "@elin-blog/db";
import { useRequest } from "ahooks";
import Write from "./Write";
import { useState } from "react";
import Comment from "./Comment";
import { Comment as CommentEntity } from "@elin-blog/db";

const CommentBar = ({
  articleId,
  className,
}: {
  type: CommentEntity["type"];
  articleId?: number;
  className?: string;
}) => {
  const type = articleId ? "article" : "comment";

  const { data = [], run } = useRequest(() =>
    fetchCommentList({ type, articleId })
  );

  console.log(data)

  const [replyTarget, setReplyTarget] = useState<CommentEntity | null>(null);

  const refreshList = () => {
    run();
    setReplyTarget(null);
  };

  return (
    <Card className={className}>
      <Write
        publishCallback={async ({ avatar, nickname, content }) => {
          await createComment(
            {
              avatar,
              nickname,
              content,
              type,
            },
            articleId
          );

          refreshList();
        }}
      />

      <div className="divider"></div>

      <div className="text-xs">
        共{data.length}条{articleId ? "评论" : "留言"}
      </div>

      <div className="mt-6 flex flex-col divide-y">
        {data.map((item) => {
          return (
            <Comment
              {...item}
              refreshList={refreshList}
              replyTarget={replyTarget}
              setReplyTarget={setReplyTarget}
              key={item.id}
              type={type}
            ></Comment>
          );
        })}
      </div>
    </Card>
  );
};

export default CommentBar;
