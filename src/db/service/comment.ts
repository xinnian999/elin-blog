"use server";

import { Comment, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";
import { IsNull } from "typeorm";

export const fetchCommentList = async () => {
  const postRepository = await getRepository(Comment);
  const data = await postRepository.find({
    relations: [
      "parentComment",
      "replies",
      "replies.parentComment",
      'replies.targetComment',
    ],
    order: { id: "DESC" },
    where: {
      parentComment: IsNull(),
    },
  }); // 查询所有分类

  return instanceToPlain(data) as Comment[];
};

export const createComment = async (params: Comment) => {
  const postRepository = await getRepository(Comment);
  const comment = postRepository.create(params);

  await postRepository.save(comment);

  return;
};

export const replyComment = async ({
  parentCommentId,
  targetCommentId,
  params,
}: {
  parentCommentId?: number;
  targetCommentId: number;
  params: Comment;
}) => {
  console.log(parentCommentId, "parentCommentId");
  const postRepository = await getRepository(Comment);

  const comment = postRepository.create(params);

  // 关联父评论
  if (parentCommentId) {
    const parentComment = await postRepository.findOneBy({
      id: parentCommentId,
    });

    if (parentComment) {
      comment.parentComment = parentComment;
    }
  }

  const targetComment = await postRepository.findOneBy({
    id: targetCommentId,
  });

  if (targetComment) {
    comment.targetComment = targetComment; // 关联目标评论
  }

  await postRepository.save(comment);

  return;
};
