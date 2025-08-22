"use server"
import { Article, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";

export async function getArticleById(articleId: number) {
  const articleRepository = await getRepository(Article);

  if (isNaN(Number(articleId))) {
    return { message: "文章ID不合法" };
  }

  const article = await articleRepository.findOne({
    where: { id: Number(articleId) },
    relations: ["category", "tags"],
  });

  if (!article) {
    return { message: "文章不存在" };
  }

  // 根据文章分类查找相关文章
  const relateArticles = await articleRepository.find({
    where: {
      category: {
        id: article?.category.id,
      },
    },
    relations: ["category", "tags"],
    order: {
      id: "DESC",
    },
  });

  const relates = relateArticles.filter(
    (article) => article.id !== Number(articleId)
  );

  return {
    article: instanceToPlain(article) as Article,
    relates: instanceToPlain(relates.slice(0, 5)) as Article[],
  };
}
