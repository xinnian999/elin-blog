import { parseUrlSearch } from "@/utils";
import { Tag, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";
import { NextRequest } from "next/server";

const relations = ["articles"];

export async function GET(request: NextRequest) {
  const { pageNum = 1, pageSize = 10, orderBys } = parseUrlSearch(request);

  const CategoryRepository = await getRepository(Tag);

  const [list, total] = await CategoryRepository.findAndCount({
    skip: (pageNum - 1) * pageSize, // 跳过前面的记录
    take: pageSize, // 每页返回的记录数
    order: orderBys,
    relations,
  });

  return Response.json({
    list: instanceToPlain(list),
    total,
    pageTotal: Math.ceil(total / pageSize),
  });
}

export async function POST(request: NextRequest) {
  const params = await request.json();

  const CategoryRepository = await getRepository(Tag);

  const form = CategoryRepository.create(params);

  await CategoryRepository.save(form);

  return Response.json(form);
}

export async function PUT(request: NextRequest) {
  const params = await request.json();

  const CategoryRepository = await getRepository(Tag);

  const res = await CategoryRepository.update({ id: params.id }, params);

  return Response.json(res);
}

export async function DELETE(request: NextRequest) {
  const { ids } = parseUrlSearch(request);

  const CategoryRepository = await getRepository(Tag);

  try {
    await CategoryRepository.delete(ids);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }

  return Response.json({ message: "删除成功" });
}
