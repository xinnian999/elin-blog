import { Comment } from "@/db";
import request from "./request";

const getCommentRootList = async (params: Record<string, any>) => {
  const res = await request({
    path: "/comment/rootList",
    method: "GET",
    params,
  });

  return res as ListResponse<Comment>;
};

const createComment = async (data: Record<string, any>) => {
  const res = await request({
    path: "/comment",
    method: "POST",
    data,
  });

  return res as Comment;
};

const replyComment = async (data: Record<string, any>) => {
  const res = await request({
    path: "/comment/reply",
    method: "POST",
    data,
  });

  return res as Comment;
};

const likeComment = async (data: Record<string, any>) => {
  const res = await request({
    path: "/comment/like",
    method: "PUT",
    data,
  });

  return res as Comment;
};

export default {
  getCommentRootList,
  createComment,
  replyComment,
  likeComment,
};
