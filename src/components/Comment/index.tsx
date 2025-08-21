"use client";

import { Card } from "@/components";
import { useMount, useRequest } from "ahooks";
import Write from "./Write";
import { useState } from "react";
import Comment from "./Comment";
import { Comment as CommentEntity } from "@/db";
import commentApi from "@/api/comment";

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

  const { data, run } = useRequest(() =>
    commentApi.getCommentRootList({
      filters: { type, articleId },
      orderBys: { id: "desc" },
    })
  );

  const list = data?.list || initialData;

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
        top={list.length < 2}
        publishCallback={async ({ avatar, nickname, content, email }) => {
          await commentApi.createComment({
            avatar,
            nickname,
            content,
            type,
            email,
            articleId,
          });

          refreshList();
        }}
      />

      <div className="divider"></div>

      <div className="text-xs">
        共{list.length}条{articleId ? "评论" : "留言"}
      </div>

      <div className=" flex flex-col divide-y">
        {list.map((item) => {
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
