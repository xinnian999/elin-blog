import { Category } from "@/db";
import request from "./request";

const getCategoryList = async (params: Record<string, any>) => {
  const res = await request({
    path: "/category",
    method: "GET",
    params,
  });

  return res as ListResponse<Category>;
};

const getCategoryById = async (id: number) => {
  const res = await request({
    path: `/category/${id}`,
    method: "GET",
  });

  return res as Category;
};
export default {
  getCategoryList,
  getCategoryById,
};
