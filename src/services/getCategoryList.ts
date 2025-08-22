"use server";
import { Category, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";

export async function getCategoryList(params: ListServiceParams) {
  const { pageNum = 1, pageSize = 10, order, where } = params || {};

  const CategoryRepository = await getRepository(Category);

  const [list, total] = await CategoryRepository.findAndCount({
    skip: (pageNum - 1) * pageSize, // 跳过前面的记录
    take: pageSize, // 每页返回的记录数
    order: order,
    relations: ["articles"],
    where,
  });

  return {
    list: instanceToPlain(list),
    total,
    pageTotal: Math.ceil(total / pageSize),
  } as ListResponse<Category>;
}
