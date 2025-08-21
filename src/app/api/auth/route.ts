import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const params = await request.json();

  const { username, password } = params;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // 生成token
    const token = jwt.sign({ username }, "blog-admin-token");

    // 给前端设置token到cookie
    const response = NextResponse.json({
      code: 200,
      message: "登录成功",
    });

    response.cookies.set("auth_token", token, {
      httpOnly: false,
      expires: new Date(Date.now() + 60000 * 60 * 24),
    });

    return response;
  }

  return NextResponse.json(
    {
      code: 401,
      message: "用户名或密码错误",
    },
    { status: 401 }
  );
}
