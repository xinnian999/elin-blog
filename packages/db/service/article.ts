"use server";

import { Article, getRepository, Tag } from "@elin-blog/db";
import { instanceToPlain } from "class-transformer";

export const fetchArticleList = async () => {
  const postRepository = await getRepository(Article);
  const data = await postRepository.find({
    relations: ["category", "tags"], // 明确指定要加载 `category` 关联
  }); // 查询所有文章

  // 直接使用 plainToClass 进行深度序列化，所有字段都会被序列化
  return instanceToPlain(data) as Article[];
};

export async function fetchArticleListByPage(page: number, pageSize: number) {
  const articleRepository = getRepository(Article);

  const [articles, total] = await (
    await articleRepository
  ).findAndCount({
    skip: (page - 1) * pageSize, // 跳过前面的记录
    take: pageSize, // 每页返回的记录数
    order: { id: "desc" },
    relations: ["category", "tags"],
  });

  return {
    data: instanceToPlain(articles) as Article[],
    total, // 总记录数
    totalPages: Math.ceil(total / pageSize), // 总页数
    currentPage: page,
  };
}

export async function fetchArticleByCategory(categoryId: number) {
  const articleRepository = await getRepository(Article);

  const articles = await articleRepository.find({
    order: { id: "desc" },
    relations: ["category", "tags"],
    where: {
      category: {
        id: categoryId,
      },
    },
  });

  return articles;
}

export async function fetchArticleByTag(tagId: number) {
  const articleRepository = await getRepository(Article);

  const articles = await articleRepository.find({
    order: { id: "desc" },
    relations: ["category", "tags"],
    where: {
      tags: {
        id: tagId,
      },
    },
  });

  return articles;
}

export async function fetchArticleById(id: number) {
  const articleRepository = getRepository(Article);

  const article = await (
    await articleRepository
  ).findOne({
    where: { id },
    relations: ["category", "tags"], // 明确指定要加载 `category` 关联
  });

  return article || null;
}

export const createArticle = async (params: Article) => {
  const postRepository = await getRepository(Article);

  // 查找与给定 ID 相关联的标签
  const tags = await (await getRepository(Tag)).findByIds(params.tags);

  // 创建新的文章实例
  const article = new Article();
  article.title = params.title;
  article.content = params.content;
  article.category = params.category;
  article.tags = tags; // 关联标签

  await postRepository.save(article);

  return;
};

export const updateArticle = async (id: number, params: Article) => {
  const postRepository = await getRepository(Article);

  // 查找文章并加载关联的标签
  const article = await postRepository.findOne({
    where: { id },
    relations: ["tags"],
  });

  if (!article) {
    throw new Error("Article not found");
  }

  article.title = params.title;
  article.content = params.content;
  article.category = params.category;

  // 查找与给定 ID 相关联的标签
  const tags = await (await getRepository(Tag)).findByIds(params.tags);

  article.tags = tags; // 关联标签

  await postRepository.save(article);

  return;
};

export const deleteArticle = async (id: number) => {
  const postRepository = await getRepository(Article);
  await postRepository.delete(id);

  return;
};

export const getArticleArchive = async () => {
  const articleRepository = getRepository(Article);

  // 按年和月分组，并统计每个月的文章数量
  const archive = (await articleRepository)
    .createQueryBuilder("article")
    .select([
      "EXTRACT(YEAR FROM article.created_at) AS year", // 提取年份
      "COUNT(article.id) AS article_count", // 统计文章数量
    ])
    .groupBy("year") // 按年和月分组
    .orderBy("year", "DESC") // 按年份降序排序
    .getRawMany(); // 获取原始数据（不经过实体映射）

  return archive;
};
