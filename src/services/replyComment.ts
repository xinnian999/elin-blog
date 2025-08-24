"use server"
import sendEmail from "@/async/sendEmail";
import setCommentInfo from "./setCommentInfo";
import { Comment, getRepository, } from "@/db";
import { instanceToPlain } from "class-transformer";

export const replyComment = async ({ parentCommentId, targetCommentId, payload }: { parentCommentId?: number, targetCommentId: number, payload: Comment }) => {

    const postRepository = await getRepository(Comment);

    const comment = postRepository.create(payload as Comment);

    // 关联父评论
    if (parentCommentId) {
        const parentComment = await postRepository.findOneBy({
            id: parentCommentId,
        });

        if (parentComment) {
            comment.parentComment = parentComment;
        }
    }

    const targetComment = await postRepository.findOneBy({
        id: targetCommentId,
    });

    if (targetComment) {
        comment.targetComment = targetComment; // 关联目标评论
    }

    await setCommentInfo(comment);

    const reply = await postRepository.save(comment);

    // 如果目标评论绑定了邮箱，则发送邮件通知
    if (targetComment?.email) {
        sendEmail(
            targetComment.email,
            `
          <p>你在我的博客的留言：</p>
          <p><b>${targetComment.content}</b></p>
          <br/>
          <p>收到新的回复：</p>
          <p><b>${reply.content}</b></p>
          <br/>
          <p>点击<a href="https://elin521.cn/${reply.type}?target=${reply.id}">前往查看</a></p>
          <br/>
          <p>—— 来自 <a href="https://elin521.cn">Elin's Blog</a></p>
        `
        );
    }

    return instanceToPlain(comment);
};
