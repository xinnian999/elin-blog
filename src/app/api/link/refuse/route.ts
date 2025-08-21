import { getRepository, Link } from "@/db";
import { NextRequest } from "next/server";
import sendEmail from "@/async/sendEmail";

export async function PUT(request: NextRequest) {
  const params = await request.json();

  const postRepository = await getRepository(Link);

  const link = await postRepository.findOneBy({ id: params.id });

  if (link) {
    link.status = 1;
    await postRepository.save(link);

    if (link.email) {
      sendEmail(
        link.email,
        `
        <p>抱歉，你的友链申请审核不通过，请根据以下原因修改后重新提交</p>
        <br/>
        <p>原因：${params.reason}</p>
        <br/>
        <p>点击<a href="https://elin521.cn/link">前往查看</a></p>
        <br/>
        <p>—— 来自 <a href="https://elin521.cn">Elin's Blog</a></p>
      `
      );
    }

    return Response.json(link);
  }

  return Response.json(
    {
      message: "友链不存在",
    },
    { status: 500 }
  );
}
