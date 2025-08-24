"use server"
import { Comment, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";

export const likeComment = async (id: number) => {
    const commentRepository = await getRepository(Comment);
    const comment = await commentRepository.findOneBy({ id });
    if (comment) {
        comment.likes = (comment.likes || 0) + 1;

        await commentRepository.save(comment);
    }
    return instanceToPlain(comment) as Comment;
};