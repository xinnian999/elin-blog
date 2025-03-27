import { parseUrlSearch } from "@/utils";
import {
  createForm,
  deleteForm,
  fetchFormList,
  updateForm,
} from "@elin-blog/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { pageNum, pageSize } = parseUrlSearch(request);

  const { list, total } = await fetchFormList({ pageNum, pageSize });

  return Response.json({ list, total });
}

export async function POST(request: NextRequest) {
  const params = await request.json();

  const res = await createForm(params);

  return Response.json(res);
}

export async function PUT(request: NextRequest) {
  const params = await request.json();

  const res = await updateForm(params.id, params);

  return Response.json(res);
}

export async function DELETE(request: NextRequest) {
  const { id } = parseUrlSearch(request);

  const res = await deleteForm(id);

  return Response.json(res);
}
