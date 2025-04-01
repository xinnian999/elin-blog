import { parseUrlSearch } from "@/utils";
import { Article, Form, getRepository } from "@elin-blog/db";
import { instanceToPlain } from "class-transformer";
import { NextRequest } from "next/server";

const relations = ["category", "tags"];

export async function GET(request: NextRequest) {
  const {
    pageNum = 1,
    pageSize = 10,
    order,
    where,
  } = parseUrlSearch(request);

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

  const articleRepository = await getRepository(Form);

  const form = articleRepository.create(params);

  await articleRepository.save(form);

  return Response.json(form);
}

export async function PUT(request: NextRequest) {
  const params = await request.json();

  const articleRepository = await getRepository(Form);

  const res = await articleRepository.update({ id: params.id }, params);

  return Response.json(res);
}

export async function DELETE(request: NextRequest) {
  const { ids } = parseUrlSearch(request);

  const articleRepository = await getRepository(Form);

  await articleRepository.delete(ids);

  return Response.json({ message: "删除成功" });
}
