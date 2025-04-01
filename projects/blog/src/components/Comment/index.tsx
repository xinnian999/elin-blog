"use client";

import { Card } from "@/components";
import { createComment, fetchCommentList } from "@/db";
import { useMount, useRequest } from "ahooks";
import Write from "./Write";
import { useState } from "react";
import Comment from "./Comment";
import { Comment as CommentEntity } from "@/db";

const CommentBar = ({
  type = "comment",
  articleId,
  className,
  initialData = [],
}: {
  type: CommentEntity["type"];
  articleId?: number;
  className?: string;
  initialData?: CommentEntity[];
}) => {
  // const type = articleId ? "article" : "comment";

  const { data = initialData, run } = useRequest(() =>
    fetchCommentList({ type, articleId })
  );

  const [replyTarget, setReplyTarget] = useState<CommentEntity | null>(null);

  const refreshList = () => {
    run();
    setReplyTarget(null);
  };

  // 跳转至目标评论
  useMount(() => {
    const params = new URLSearchParams(window.location.search);

    const target = params.get("target");

    if (target) {
      const targetComment = document.getElementById(target);

      if (targetComment) {
        targetComment.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });

  return (
    <Card className={className}>
      <Write
        top={data.length < 2}
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

      <div className=" flex flex-col divide-y">
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
