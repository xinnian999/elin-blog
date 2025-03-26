import { parseUrlSearch } from "@/utils";
import { createForm, fetchFormList } from "@elin-blog/db";
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
