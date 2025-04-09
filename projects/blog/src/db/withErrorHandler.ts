import { NextRequest } from "next/server";
import {
  QueryFailedError,
  EntityPropertyNotFoundError, // 👈 加这个
} from "typeorm";

type Handler = (req: NextRequest) => Promise<Response>;


// API路由错误边界
export function withErrorHandler(handler: Handler): Handler {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        console.error("[DB Error]", error.message);
        return Response.json(
          { message: "数据库操作失败", error: error.message },
          { status: 400 }
        );
      }

      if (error instanceof EntityPropertyNotFoundError) {
        console.error("[Entity Property Error]", error.message);
        return Response.json(
          { message: "实体字段错误，请检查字段名", error: error.message },
          { status: 400 }
        );
      }

      console.error("[Unknown Error]", error);
      return Response.json({ message: "服务器内部错误" }, { status: 500 });
    }
  };
}
