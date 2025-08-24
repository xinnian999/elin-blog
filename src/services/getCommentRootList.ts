"use server"
import { Comment, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";
import { IsNull } from "typeorm";

export const getCommentRootList = async (params: ListServiceParams) => {
    const {
        pageNum = 1,
        pageSize = 10,
        order,
        where = {},
    } = params;

    const commentRepository = await getRepository(Comment);

    where.parentComment = IsNull();

    if (where.type === "article" && where.articleId) {
        where.parentArticle = { id: where.articleId };
        delete where.articleId;
    }

    const [list, total] = await commentRepository.findAndCount({
        skip: (pageNum - 1) * pageSize, // 跳过前面的记录
        take: pageSize, // 每页返回的记录数
        order,
        where,
        relations: [
            "parentComment",
            "replies",
            "replies.parentComment",
            "replies.targetComment",
            "parentArticle",
        ],
    });

    return {
        list: instanceToPlain(list) as Comment[],
        total,
        pageTotal: Math.ceil(total / pageSize),
    };
};
