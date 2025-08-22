import { parseUrlSearch } from "@/utils";
import { Article, getRepository, Tag } from "@/db";
import { NextRequest } from "next/server";
import { getArticleList } from "@/services";

const relations = ["category", "tags"];

export async function GET(request: NextRequest) {
  const { pageNum = 1, pageSize = 10, order, where } = parseUrlSearch(request);

  const res = await getArticleList({
    pageNum,
    pageSize,
    order,
    where,
  });

  return Response.json(res);
}

export async function POST(request: NextRequest) {
  const params = await request.json();

  const articleRepository = await getRepository(Article);

  const article = articleRepository.create(params) as unknown as Article;

  const tags = await (await getRepository(Tag)).findByIds(params.tags);
    
  article.tags = tags; // 关联标签

  await articleRepository.save(article);

  return Response.json(article);
}

export async function PUT(request: NextRequest) {
  const params = await request.json();

  const articleRepository = await getRepository(Article);

  // 查找文章并加载关联的标签
  const article = await articleRepository.findOne({
    where: { id: params.id },
    relations,
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

  await articleRepository.save(article);

  return Response.json(article);
}

export async function DELETE(request: NextRequest) {
  const { ids } = parseUrlSearch(request);

  const articleRepository = await getRepository(Article);

  await articleRepository.delete(ids);

  return Response.json({ message: "删除成功" });
}
