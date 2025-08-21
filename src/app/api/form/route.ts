import { parseUrlSearch } from "@/utils";
import { Form, getRepository } from "@/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const {
    pageNum = 1,
    pageSize = 10,
    orderBys,
    where,
  } = parseUrlSearch(request);

  const formRepository = await getRepository(Form);

  const [list, total] = await formRepository.findAndCount({
    skip: (pageNum - 1) * pageSize, // 跳过前面的记录
    take: pageSize, // 每页返回的记录数
    order: orderBys,
    where,
  });

  return Response.json({ list, total });
}

export async function POST(request: NextRequest) {
  const params = await request.json();

  const formRepository = await getRepository(Form);

  const form = formRepository.create(params);

  await formRepository.save(form);

  return Response.json(form);
}

export async function PUT(request: NextRequest) {
  const params = await request.json();

  const formRepository = await getRepository(Form);

  const res = await formRepository.update({ id: params.id }, params);

  return Response.json(res);
}

export async function DELETE(request: NextRequest) {
  const { ids } = parseUrlSearch(request);

  const formRepository = await getRepository(Form);

  await formRepository.delete(ids);

  return Response.json({ message: "删除成功" });
}
