import { Tag, getRepository } from "@/db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tagId: string }> }
) {
  const { tagId } = await params;

  const tagRepository = await getRepository(Tag);

  if (isNaN(Number(tagId))) {
    return Response.json({ message: "标签ID不合法" }, { status: 400 });
  }

  const tag = await tagRepository.findOne({
    where: { id: Number(tagId) },
  });

  if (!tag) {
    return Response.json({ message: "标签不存在" }, { status: 404 });
  }

  return Response.json(tag);
}
