"use server";

import { Tag, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";

export const fetchTagList = async () => {
  const postRepository = await getRepository(Tag);
  const data = await postRepository.find(); // 查询所有标签

  return instanceToPlain(data) as Tag[];
};

export const createTag = async (params: Tag) => {
  const postRepository = await getRepository(Tag);
  const tag = postRepository.create(params);

  await postRepository.save(tag);

  return;
};