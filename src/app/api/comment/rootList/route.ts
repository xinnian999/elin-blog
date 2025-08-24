import { withErrorHandler } from "@/db";
import { getCommentRootList } from "@/services";
import { parseUrlSearch } from "@/utils";
import { instanceToPlain } from "class-transformer";
import { NextRequest } from "next/server";

export const GET = withErrorHandler(async (request: NextRequest) => {
  const {
    pageNum = 1,
    pageSize = 10,
    order,
    where,
  } = parseUrlSearch(request);

  const { list, total } = await getCommentRootList({
    pageNum,
    pageSize,
    order,
    where,
  });

  return Response.json({
    list: instanceToPlain(list),
    total,
    pageTotal: Math.ceil(total / pageSize),
  });
});
