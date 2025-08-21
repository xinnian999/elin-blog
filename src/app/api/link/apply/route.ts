import { getRepository, Link } from "@/db";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const params = await request.json();

  const linkRepository = await getRepository(Link);

  const link = linkRepository.create(params);

  await linkRepository.save(link);

  return Response.json({ link, status: "success" });
}
