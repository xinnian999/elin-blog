import { Article } from "@/db";
import request from "./request";

const getArticleList = async (params: Record<string, any>) => {
  return await request<{
    list: Article[];
    total: number;
    pageTotal: number;
  }>({
    path: "/article",
    method: "GET",
    params,
  });
};

export default {
  getArticleList,
};
