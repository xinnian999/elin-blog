import { Tag } from "@/db";
import request from "./request";

const getTagList = async (params: Record<string, any>) => {
  const res = await request({
    path: "/tag",
    method: "GET",
    params,
  });

  return res as ListResponse<Tag>;
};

const getTagById = async (id: number) => {
  const res = await request({
    path: `/tag/${id}`,
    method: "GET",
  });

  return res as Tag;
};

export default {
  getTagList,
  getTagById,
};
