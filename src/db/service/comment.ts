"use server";

import { Comment, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";
import { IsNull } from "typeorm";

export const fetchCommentList = async () => {
  const postRepository = await getRepository(Comment);
  const data = await postRepository.find({
    relations: ["parentComment", "replies"],
    order: { id: "DESC" },
    where: {
      parentComment: IsNull(),
    },
  }); // 查询所有分类

  console.log(data);
  return instanceToPlain(data) as Comment[];
};

export const createComment = async (params: Comment) => {
  const postRepository = await getRepository(Comment);
  const comment = postRepository.create(params);

  await postRepository.save(comment);

  return;
};

export const replyComment = async (
  parentCommentId: number,
  params: Comment
) => {
  const postRepository = await getRepository(Comment);

  const comment = postRepository.create(params);

  const parentComment = await postRepository.findOneBy({
    id: parentCommentId,
  });

  if (parentComment) {
    comment.parentComment = parentComment;
  }

  await postRepository.save(comment);

  return;
};
