"use server"

import { Article, Comment, getRepository } from "@/db";
import setCommentInfo from "./setCommentInfo";
import { instanceToPlain } from "class-transformer";

export const createComment = async (params: Record<string, any>) => {

    const commentRepository = await getRepository(Comment);

    const comment = commentRepository.create(params) as unknown as Comment;

    await setCommentInfo(comment);

    // 如果是文章评论且提供了文章ID，那么绑定对应的文章
    if (params.type === "article" && params.articleId) {
        (comment.parentArticle as Partial<Article>) = { id: params.articleId };
    }

    await commentRepository.save(comment);

    return instanceToPlain(comment) as Comment;
}