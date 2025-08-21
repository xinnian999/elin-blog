import { Category, getRepository } from "@/db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  const { categoryId } = await params;

  const categoryRepository = await getRepository(Category);

  if (isNaN(Number(categoryId))) {
    return Response.json({ message: "分类ID不合法" }, { status: 400 });
  }

  const category = await categoryRepository.findOne({
    where: { id: Number(categoryId) },
  });

  if (!category) {
    return Response.json({ message: "分类不存在" }, { status: 404 });
  }

  return Response.json(category);
}
