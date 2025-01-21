"use server";

import { Article, getRepository } from "@/db";

export const fetchArticleList = async () => {
  const postRepository = await getRepository(Article);
  const data = await postRepository.find(); // 查询所有文章

  return data.map((item) => ({ ...item }));
};

export const createArticle = async (params: Article) => {
  const postRepository = await getRepository(Article);
  const article = postRepository.create(params);

  await postRepository.save(article);

  return;
};

export const updateArticle = async (id: number, params: Article) => {
  const postRepository = await getRepository(Article);
  delete params.id;
  await postRepository.update({ id }, params);

  return;
};

export const deleteArticle = async (id: number) => {
  const postRepository = await getRepository(Article);
  await postRepository.delete(id);

  return;
};
