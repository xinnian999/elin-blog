"use server";

import { Article, Tag, Category, getRepository } from "@elin-blog/db";

export const fetchSummary = async () => {
  const articleCount = (await getRepository(Article)).count();
  const tagCount = (await getRepository(Tag)).count();
  const categoryCount = (await getRepository(Category)).count();

  return { articleCount, tagCount, categoryCount };
};
