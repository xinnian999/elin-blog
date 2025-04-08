import { Link } from "@/db";
import request from "./request";

const getLinkList = async (params: Record<string, any>) => {
  const res = await request({
    path: "/link",
    method: "GET",
    params,
  });

  return res as ListResponse<Link>;
};

const applyLink = async (data: Record<string, any>) => {
  const res = await request({
    path: "/link/apply",
    method: "POST",
    data,
  });

  return res;
};

export default {
  getLinkList,
  applyLink,
};
