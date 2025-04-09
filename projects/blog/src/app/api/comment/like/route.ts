import { Comment, getRepository, withErrorHandler } from "@/db";
import { NextRequest } from "next/server";

export const PUT = withErrorHandler(async (request: NextRequest) => {
  const { id } = await request.json();

  const commentRepository = await getRepository(Comment);

  const comment = await commentRepository.findOneBy({ id });

  if (comment) {
    comment.likes = (comment.likes || 0) + 1;

    await commentRepository.save(comment);
  }

  return Response.json(comment);
});
