"use server";

import { Category, getRepository } from "@elin-blog/db";
import { instanceToPlain } from "class-transformer";

export const fetchCategoryList = async () => {
  const postRepository = await getRepository(Category);
  const data = await postRepository.find({
    relations: ["articles"],
  }); // 查询所有分类

  return instanceToPlain(data) as Category[];
};

export const createCategory = async (params: Category) => {
  const postRepository = await getRepository(Category);
  const category = postRepository.create(params);

  await postRepository.save(category);

  return;
};

export const updateCategory = async (id: number, params: Category) => {
  const postRepository = await getRepository(Category);

  await postRepository.update({ id }, params);

  return;
};
