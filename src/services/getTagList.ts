import { Tag, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";

export async function getTagList(params: ListServiceParams) {
  const { pageNum = 1, pageSize = 10, order, where } = params || {};

  const CategoryRepository = await getRepository(Tag);

  const [list, total] = await CategoryRepository.findAndCount({
    skip: (pageNum - 1) * pageSize, // 跳过前面的记录
    take: pageSize, // 每页返回的记录数
    order,
    relations: ["articles"],
    where,
  });

  return {
    list: instanceToPlain(list) as Tag[],
    total,
    pageTotal: Math.ceil(total / pageSize),
  };
}
