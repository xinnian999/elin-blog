"use server";

import { Link, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";

export const fetchLinkList = async () => {
  const postRepository = await getRepository(Link);
  const data = await postRepository.find(); // 查询所有文章

  // 直接使用 plainToClass 进行深度序列化，所有字段都会被序列化
  return instanceToPlain(data) as Link[];
};