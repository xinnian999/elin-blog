"use server";

import { Article, Comment, getRepository } from "@elin-blog/db";
import { instanceToPlain } from "class-transformer";
import { FindOptionsWhere, IsNull } from "typeorm";

export const fetchAllCommentList = async () => {
  const postRepository = await getRepository(Comment);
  const data = await postRepository.find({
    relations: [
      "parentComment",
      "targetComment",
      "replies",
      "replies.parentComment",
      "replies.targetComment",
    ],
    order: { id: "DESC" },
  });

  return instanceToPlain(data) as Comment[];
};

export const fetchHomeCommentList = async () => {
  const postRepository = await getRepository(Comment);
  const data = await postRepository.find({
    relations: [],
    order: { id: "DESC" },
    take: 5, // 每页返回的记录数
  });

  return instanceToPlain(data) as Comment[];
};

export const fetchCommentList = async ({
  type,
  articleId,
}: {
  type: Comment["type"];
  articleId?: number;
}) => {
  const commentRepository = await getRepository(Comment);

  // 查询条件
  const where: FindOptionsWhere<Comment> = {
    parentComment: IsNull(),
    type,
  };

  // 如果是文章评论且提供了文章ID，查找对应的文章
  if (type === "article" && articleId) {
    where.parentArticle = { id: articleId };
  }

  const data = await commentRepository.find({
    relations: [
      "parentComment",
      "replies",
      "replies.parentComment",
      "replies.targetComment",
      "parentArticle",
    ],
    order: { id: "DESC" },
    where,
  });

  return instanceToPlain(data) as Comment[];
};

export const createComment = async (params: Comment, articleId?: number) => {
  const commentRepository = await getRepository(Comment);
  const articleRepository = await getRepository(Article);

  const comment = new Comment();

  Object.assign(comment, params);

  if (params.type === "article" && articleId) {
    const parentArticle = await articleRepository.findOneBy({
      id: articleId,
    });

    comment.parentArticle = parentArticle!;
  }

  await commentRepository.save(comment);

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

export const deleteComment = async (id: number) => {
  const postRepository = await getRepository(Comment);
  await postRepository.delete(id);

  return;
};
