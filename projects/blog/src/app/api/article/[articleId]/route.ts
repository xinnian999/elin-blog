import { Article, getRepository } from "@/db";
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
  });

  if (!article) {
    return Response.json({ message: "文章不存在" }, { status: 404 });
  }

  return Response.json(article);
}
