import { Article } from "@/db";
import request from "./request";

const getArticleList = async (params: Record<string, any>) => {
  const res = await request({
    path: "/article",
    method: "GET",
    params,
  });

  return res as ListResponse<Article>;
};

const getArticleById = async (id: number) => {
  const res = await request({
    path: `/article/${id}`,
    method: "GET",
  });

  return res as { article: Article; relates: Article[] };
};

const getArticleArchive = async () => {
  const res = await request({
    path: "/article/archive",
    method: "GET",
  });

  return res as ListResponse<{ year: number; article_count: number }>;
};

export default {
  getArticleList,
  getArticleById,
  getArticleArchive,
};
