import { Comment, getRepository, withErrorHandler } from "@/db";
import { parseUrlSearch } from "@/utils";
import { instanceToPlain } from "class-transformer";
import { NextRequest } from "next/server";
import { FindOptionsWhere, IsNull, Like } from "typeorm";

export const GET = withErrorHandler(async (request: NextRequest) => {
  const {
    pageNum = 1,
    pageSize = 10,
    orderBys,
    filters,
  } = parseUrlSearch(request);

  const commentRepository = await getRepository(Comment);

  // 查询条件
  const where: FindOptionsWhere<Comment> = {
    parentComment: IsNull(),
    type: filters.type,
  };

  if (filters.nickname) {
    where.nickname = Like(`%${filters.nickname}%`);
  }

  if (filters.region) {
    where.region = Like(`%${filters.region}%`);
  }

  // 如果是文章评论且提供了文章ID，那么查找对应的文章评论
  if (filters.type === "article" && filters.articleId) {
    where.parentArticle = { id: filters.articleId };
  }

  const [list, total] = await commentRepository.findAndCount({
    skip: (pageNum - 1) * pageSize, // 跳过前面的记录
    take: pageSize, // 每页返回的记录数
    order: orderBys,
    where,
    relations: [
      "parentComment",
      "replies",
      "replies.parentComment",
      "replies.targetComment",
      "parentArticle",
    ],
  });

  return Response.json({
    list: instanceToPlain(list),
    total,
    pageTotal: Math.ceil(total / pageSize),
  });
});
