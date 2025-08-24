"use server";
import { Link, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";

export async function getLinkList(params: ListServiceParams) {
  const { pageNum = 1, pageSize = 10, order, where } = params || {};

  const linkRepository = await getRepository(Link);

  // 查询数据
  const [list, total] = await linkRepository.findAndCount({
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
    order,
    where,
  });

  return {
    list: instanceToPlain(list),
    total,
    pageTotal: Math.ceil(total / pageSize),
  } as ListResponse<Link>;
}
