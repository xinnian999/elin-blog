"use server";
import { Article, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";

export async function getArticleList(params: ListServiceParams) {
  const { pageNum = 1, pageSize = 10, order, where } = params || {};

  const articleRepository = await getRepository(Article);

  // 查询数据
  const [list, total] = await articleRepository.findAndCount({
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
    order,
    relations: ["category", "tags"],
    where,
  });

  return {
    list: instanceToPlain(list),
    total,
    pageTotal: Math.ceil(total / pageSize),
  } as ListResponse<Article>;
}
