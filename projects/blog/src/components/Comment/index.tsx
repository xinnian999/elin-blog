"use client";

import { Card } from "@/components";
import { createComment, fetchCommentList } from "@elin-blog/db";
import { useMount, useRequest } from "ahooks";
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


  const { data = [], run } = useRequest(
    () => fetchCommentList({ type, articleId })
  );

  const [replyTarget, setReplyTarget] = useState<CommentEntity | null>(null);

  const refreshList = () => {
    run();
    setReplyTarget(null);
  };

  useMount(() => {
    const params = new URLSearchParams(window.location.search);

    const target = params.get("target");

    if (target) {
      setTimeout(() => {
        const targetComment = document.getElementById(target);
        console.log(targetComment);

        if (targetComment) {
          targetComment.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      },2000);
    }
  });

  return (
    <Card className={className}>
      <Write
        publishCallback={async ({ avatar, nickname, content, email }) => {
          await createComment(
            {
              avatar,
              nickname,
              content,
              type,
              email,
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
