import { fetchFormList } from "@elin-blog/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const pageNum = +(searchParams.get("pageNum") || 1);
  const pageSize = +(searchParams.get("pageSize") || 0);

  const { list, total } = await fetchFormList({ pageNum, pageSize });

  return Response.json({ list, total });
}
