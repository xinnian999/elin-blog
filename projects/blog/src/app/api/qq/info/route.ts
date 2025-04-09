import { parseUrlSearch } from "@/utils";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const { qq } = parseUrlSearch(request);

  const res = await fetch(`http://api.ilingku.com/int/v1/qqname?qq=${qq}`);
  const data = await res.json();

  return Response.json(data);
};
