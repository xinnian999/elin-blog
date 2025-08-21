import { Article, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  const { articleId } = await params;

  const articleRepository = await getRepository(Article);

  if (isNaN(Number(articleId))) {
    return Response.json({ message: "文章ID不合法" }, { status: 400 });
  }

  const article = await articleRepository.findOne({
    where: { id: Number(articleId) },
    relations: ["category", "tags"],
  });

  if (!article) {
    return Response.json({ message: "文章不存在" }, { status: 404 });
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

  return Response.json({
    article: instanceToPlain(article),
    relates: instanceToPlain(relates.slice(0, 5)),
  });
}
