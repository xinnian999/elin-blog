import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  // GET请求不需要鉴权
  if (request.method === "GET") {
    return NextResponse.next();
  }

  // auth不需要鉴权
  if (request.url.includes("/auth")) {
    return NextResponse.next();
  }

  // 鉴权
  const auth_token = request.cookies.get("auth_token");

  // 没有token，拒绝访问
  if (!auth_token) {
    return NextResponse.json(
      {
        code: 401,
        message: "身份失效，请重新登录",
        redirect: "/login",
      },
      { status: 401 }
    );
  }

  try {
    await jwtVerify(
      auth_token.value,
      new TextEncoder().encode("blog-admin-token")
    );

    // 解密成功，放行
    return NextResponse.next();
  } catch {
    // 解密失败，拒绝访问
    return NextResponse.json(
      {
        code: 401,
        message: "身份失效，请重新登录",
        redirect: "/login",
      },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: "/api/:path*",
};
