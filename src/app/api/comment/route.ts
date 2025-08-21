import { parseUrlSearch } from "@/utils";
import { Article, Comment, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";
import { NextRequest } from "next/server";
import { withErrorHandler } from "@/db";
import setCommentInfo from "./setCommentInfo";

export const GET = withErrorHandler(async (request: NextRequest) => {
  const {
    pageNum = 1,
    pageSize = 10,
    orderBys,
    where,
  } = parseUrlSearch(request);

  const commentRepository = await getRepository(Comment);

  const [list, total] = await commentRepository.findAndCount({
    skip: (pageNum - 1) * pageSize, // 跳过前面的记录
    take: pageSize, // 每页返回的记录数
    order: orderBys,
    where,
    relations: ["parentArticle", "parentComment", "targetComment"],
  });

  return Response.json({
    list: instanceToPlain(list),
    total,
    pageTotal: Math.ceil(total / pageSize),
  });
});

export const POST = withErrorHandler(async (request: NextRequest) => {
  const params = await request.json();

  const commentRepository = await getRepository(Comment);

  const comment = commentRepository.create(params) as unknown as Comment;

  await setCommentInfo(comment);

  // 如果是文章评论且提供了文章ID，那么绑定对应的文章
  if (params.type === "article" && params.articleId) {
    (comment.parentArticle as Partial<Article>) = { id: params.articleId };
  }

  await commentRepository.save(comment);

  return Response.json(comment);
});

export const DELETE = withErrorHandler(async (request: NextRequest) => {
  const { ids } = parseUrlSearch(request);

  const commentRepository = await getRepository(Comment);

  try {
    await commentRepository.delete(ids);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }

  return Response.json({ message: "删除成功" });
});
