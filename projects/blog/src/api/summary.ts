import request from "./request";

const getArticleSummary = async () => {
  const res = await request({
    path: "/summary/article",
    method: "GET",
  });

  return res as ListResponse<Comment>;
};

const getVisits = async () => {
  const res = await request({
    path: "/summary/visits",
    method: "GET",
  });

  return res as { visits: number };
};

export default {
  getArticleSummary,
  getVisits,
};
