"use server";

import { Article, Comment, getRepository } from "@elin-blog/db";
import { instanceToPlain } from "class-transformer";
import { FindOptionsWhere, IsNull } from "typeorm";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import { isIPv4, sendEmail } from "./utils";


const setCommentInfo = async (comment: Comment) => {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for");

  const userAgent = headersList.get("user-agent");

  if (isIPv4(ip!)) {
    const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`);

    const data = await response.json();

    comment.ip = data.query;
    comment.country = data.country;
    comment.region = data.regionName;
    comment.city = data.city;
  }

  if (userAgent) {
    const ua = UAParser(userAgent);
    comment.browser = `${ua.browser.name} ${ua.browser.version}`;
    comment.os = `${ua.os.name} ${ua.os.version}`;
  }
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
    order: {
      id: "DESC",
      replies: {
        id: "DESC",
      },
    },
    where,
  });

  return instanceToPlain(data) as Comment[];
};

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

export const createComment = async (params: Comment, articleId?: number) => {
  const commentRepository = await getRepository(Comment);
  const articleRepository = await getRepository(Article);

  const comment = new Comment();

  Object.assign(comment, params);

  await setCommentInfo(comment);

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

  await setCommentInfo(comment);

  const reply = await postRepository.save(comment);

  // 如果目标评论绑定了邮箱，则发送邮件通知
  if (targetComment?.email) {
    sendEmail(
      targetComment.email,
      `
        <p>你在我的博客的留言：</p>
        <p><b>${targetComment.content}</b></p>
        <br/>
        <p>收到新的回复：</p>
        <p><b>${reply.content}</b></p>
        <br/>
        <p>点击<a href="https://elin521.cn/${reply.type}?target=${reply.id}">前往查看</a></p>
        <br/>
        <p>—— 来自 <a href="https://elin521.cn">Elin's Blog</a></p>
      `
    );
  }

  return;
};

export const deleteComment = async (id: number) => {
  const postRepository = await getRepository(Comment);
  await postRepository.delete(id);

  return;
};

export const likeComment = async (id: number) => {
  const postRepository = await getRepository(Comment);
  const comment = await postRepository.findOneBy({ id });

  if (!comment) {
    throw new Error("评论不存在");
  }

  if (comment.likes) {
    comment.likes++;
  } else {
    comment.likes = 1;
  }

  await postRepository.save(comment);

  return comment.likes;
};

export const dislikeComment = async (id: number) => {
  const postRepository = await getRepository(Comment);
  const comment = await postRepository.findOneBy({ id });

  if (!comment) {
    throw new Error("评论不存在");
  }

  if (comment.likes) {
    comment.likes++;
  } else {
    comment.likes = 1;
  }

  await postRepository.save(comment);
};
