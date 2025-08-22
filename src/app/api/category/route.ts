import { parseUrlSearch } from "@/utils";
import { Category, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";
import { NextRequest } from "next/server";
import { getCategoryList } from "@/services";

export async function GET(request: NextRequest) {
  const { pageNum = 1, pageSize = 10, order } = parseUrlSearch(request);

  const { list, total } = await getCategoryList({
    pageNum,
    pageSize,
    order,
  });

  return Response.json({
    list: instanceToPlain(list),
    total,
    pageTotal: Math.ceil(total / pageSize),
  });
}

export async function POST(request: NextRequest) {
  const params = await request.json();

  const CategoryRepository = await getRepository(Category);

  const form = CategoryRepository.create(params);

  await CategoryRepository.save(form);

  return Response.json(form);
}

export async function PUT(request: NextRequest) {
  const params = await request.json();

  const CategoryRepository = await getRepository(Category);

  const res = await CategoryRepository.update({ id: params.id }, params);

  return Response.json(res);
}

export async function DELETE(request: NextRequest) {
  const { ids } = parseUrlSearch(request);

  const CategoryRepository = await getRepository(Category);

  try {
    await CategoryRepository.delete(ids);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }

  return Response.json({ message: "删除成功" });
}
