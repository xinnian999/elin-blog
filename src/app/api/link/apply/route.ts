import { applyLink } from "@/services";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const params = await request.json();

  const res = await applyLink(params);

  return Response.json(res);
}
