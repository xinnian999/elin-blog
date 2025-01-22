import { NextResponse } from "next/server";

export function middleware() {
  // const pathname = req.nextUrl.pathname; // 获取请求的路径
  // console.log("当前路径:", pathname);

  return NextResponse.next();
}
