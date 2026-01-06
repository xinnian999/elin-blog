"use server";
import "reflect-metadata";
import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";
import * as entities from "./entity";
import path from "path";
import fs from "fs";

// SQLite 数据库文件路径，默认存储在项目根目录的 data 文件夹下
const dbPath = process.env.DB_PATH || path.join(process.cwd(), "data", "blog.sqlite");

// 确保数据目录存在
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const AppDataSource = new DataSource({
  type: "sqljs",
  location: dbPath,
  autoSave: true, // 自动保存到文件
  entities,
  synchronize: true, // 自动创建表结构
  logging: false,
});

console.log("SQLite 数据库路径:", dbPath);

export const getRepository = async <T extends ObjectLiteral>(
  entity: EntityTarget<T>
) => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log("数据库连接成功");
    } catch (e: any) {
      if (e.code === "ECONNREFUSED") {
        return Promise.reject("服务器异常：数据库连接失败");
      }
    }
  }  

  return AppDataSource.getRepository(entity);
};
