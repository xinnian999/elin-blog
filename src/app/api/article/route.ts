import { parseUrlSearch } from "@/utils";
import { Article, getRepository, Tag } from "@/db";
import { instanceToPlain } from "class-transformer";
import { NextRequest } from "next/server";

const relations = ["category", "tags"];

export async function GET(request: NextRequest) {
  const { pageNum = 1, pageSize = 10, order, where } = parseUrlSearch(request);

  const articleRepository = await getRepository(Article);

  // 查询数据
  const [list, total] = await articleRepository.findAndCount({
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
    order,
    relations,
    where,
  });

  return Response.json({
    list: instanceToPlain(list),
    total,
    pageTotal: Math.ceil(total / pageSize),
  });
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
