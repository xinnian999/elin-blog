import { Article, Category, Comment, getRepository, Tag } from "@/db";

export async function GET() {
  const articleRepository = await getRepository(Article);
  const tagRepository = await getRepository(Tag);
  const categoryRepository = await getRepository(Category);
  const commentRepository = await getRepository(Comment);

  const articleCount = await articleRepository.count();
  const tagCount = await tagRepository.count();
  const categoryCount = await categoryRepository.count();
  const commentCount = await commentRepository.count();

  return Response.json({ articleCount, tagCount, categoryCount, commentCount });
}
