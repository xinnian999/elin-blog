import { Category, getRepository } from "@/db";

export async function getCategoryById(categoryId: number) {
  const categoryRepository = await getRepository(Category);

  if (isNaN(Number(categoryId))) {
    return null;
  }

  const category = await categoryRepository.findOne({
    where: { id: Number(categoryId) },
  });

  if (!category) {
    return null;
  }

  return category;
}
