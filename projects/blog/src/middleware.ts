import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // const pathname = req.nextUrl.pathname; // 获取请求的路径
  // console.log("当前路径:", pathname);

  const token = request.cookies.get("token");

  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  console.log('token',token);
  console.log('request',request);
  

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
