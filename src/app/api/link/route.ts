import { parseUrlSearch } from "@/utils";
import { Link, LinkStatus, getRepository } from "@/db";
import { NextRequest } from "next/server";
import { getLinkList } from "@/services";

export async function GET(request: NextRequest) {
  const params = parseUrlSearch(request);

  const res = await getLinkList(params);

  return Response.json(res);
}

export async function POST(request: NextRequest) {
  const params = await request.json();

  const LinkRepository = await getRepository(Link);

  const form = LinkRepository.create(params) as unknown as Link;

  form.status = LinkStatus["审核通过"];

  await LinkRepository.save(form);

  return Response.json(form);
}

export async function PUT(request: NextRequest) {
  const params = await request.json();

  const LinkRepository = await getRepository(Link);

  const res = await LinkRepository.update({ id: params.id }, params);

  return Response.json(res);
}

export async function DELETE(request: NextRequest) {
  const { ids } = parseUrlSearch(request);

  const LinkRepository = await getRepository(Link);

  try {
    await LinkRepository.delete(ids);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }

  return Response.json({ message: "删除成功" });
}
