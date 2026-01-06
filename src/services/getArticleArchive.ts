"use server"
import { Article, getRepository } from "@/db";

export async function getArticleArchive() {
  const articleRepository = await getRepository(Article);

  // 按年分组，并统计每年的文章数量
  const archive = await articleRepository
    .createQueryBuilder("article")
    .select([
      "strftime('%Y', article.created_at) AS year", // 提取年份 (SQLite 语法)
      "COUNT(article.id) AS article_count", // 统计文章数量
    ])
    .groupBy("year") // 按年分组
    .orderBy("year", "DESC") // 按年份降序排序
    .getRawMany(); // 获取原始数据（不经过实体映射）


  return { list: archive };
}
