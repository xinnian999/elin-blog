"use server";
import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";
import * as Entities from "./entity"; // 你需要定义数据库实体

let isInitialized = false;

const AppDataSource = new DataSource({
  type: "mysql", // 或 'postgres' 等
  host: "localhost",
  port: 3306, // 端口，根据你的数据库配置
  username: "root",
  password: "991015",
  database: "blog",
  entities: Entities,
  synchronize: true, // 在开发环境下可以设置为 true，自动创建数据库表结构
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
