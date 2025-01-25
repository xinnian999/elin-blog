"use server";
import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";
import * as Entities from "./entity"; // 你需要定义数据库实体

let isInitialized = false;

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,  // 使用环境变量来设置 host
  port: parseInt(process.env.DB_PORT || '3306'),  // 使用环境变量来设置端口
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: Entities,
  synchronize: true, 
  logging: false,
});

export const getRepository = async <T extends ObjectLiteral>(
  entity: EntityTarget<T>
) => {
  if (!isInitialized) {
    await AppDataSource.initialize();
    isInitialized = true;
  }

  return AppDataSource.getRepository(entity);
};
