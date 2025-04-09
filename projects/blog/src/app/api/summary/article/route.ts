import { Article, Category, getRepository, Tag } from "@/db";

export async function GET() {
  const articleRepository = await getRepository(Article);
  const tagRepository = await getRepository(Tag);
  const categoryRepository = await getRepository(Category);

  const articleCount = await articleRepository.count();
  const tagCount = await tagRepository.count();
  const categoryCount = await categoryRepository.count();

  return Response.json({ articleCount, tagCount, categoryCount });
}
