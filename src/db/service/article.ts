"use server";

import { Article, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";

export const fetchArticleList = async () => {
  const postRepository = await getRepository(Article);
  const data = await postRepository.find({
    relations: ["category"], // 明确指定要加载 `category` 关联
  }); // 查询所有文章

  // console.log(data)
  // console.log(instanceToPlain(data))

  // 直接使用 plainToClass 进行深度序列化，所有字段都会被序列化
  return instanceToPlain(data) as Article[]
};

export async function fetchArticleListByPage(page: number, pageSize: number) {
  const articleRepository = getRepository(Article);

  const [articles, total] = await (
    await articleRepository
  ).findAndCount({
    skip: (page - 1) * pageSize, // 跳过前面的记录
    take: pageSize, // 每页返回的记录数
    order: { id: "desc" },
  });

  // console.log(articles,111)

  return {
    data: articles,
    total, // 总记录数
    totalPages: Math.ceil(total / pageSize), // 总页数
    currentPage: page,
  };
}

export async function fetchArticleById(id: number) {
  const articleRepository = getRepository(Article);

  const article = await (
    await articleRepository
  ).findOne({
    where: { id },
  });

  return article || null;
}

export const createArticle = async (params: Article) => {
  const postRepository = await getRepository(Article);
  const article = postRepository.create(params);

  await postRepository.save(article);

  return;
};

export const updateArticle = async (id: number, params: Article) => {
  const postRepository = await getRepository(Article);

  await postRepository.update({ id }, params);

  return;
};

export const deleteArticle = async (id: number) => {
  const postRepository = await getRepository(Article);
  await postRepository.delete(id);

  return;
};
