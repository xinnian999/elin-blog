"use server";

import { Article, getRepository } from "@/db";

export const fetchArticleList = async () => {
  const postRepository = await getRepository(Article);
  const data = await postRepository.find(); // 查询所有文章

  return data.map((item) => ({ ...item }));
};

export async function fetchArticleListByPage(page: number, pageSize: number) {
  const articleRepository = getRepository(Article);

  const [articles, total] = await (await articleRepository).findAndCount({
    skip: (page - 1) * pageSize,  // 跳过前面的记录
    take: pageSize,               // 每页返回的记录数
  });


  return {
    data: articles,
    total,                        // 总记录数
    totalPages: Math.ceil(total / pageSize),  // 总页数
    currentPage: page,
  };
}

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
