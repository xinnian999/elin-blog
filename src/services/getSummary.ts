import { Article, Category, Comment, getRepository, Tag } from "@/db";

export async function getSummary() {
  const articleRepository = await getRepository(Article);
  const tagRepository = await getRepository(Tag);
  const categoryRepository = await getRepository(Category);
  const commentRepository = await getRepository(Comment);

  const articleCount = await articleRepository.count();
  const tagCount = await tagRepository.count();
  const categoryCount = await categoryRepository.count();
  const commentCount = await commentRepository.count();

  return { articleCount, tagCount, categoryCount, commentCount };
}
