"use server";
import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";
import * as entities from "./entity"; // 你需要定义数据库实体

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST, // 使用环境变量来设置 host
  port: parseInt(process.env.DB_PORT || "3306"), // 使用环境变量来设置端口
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities,
  synchronize: true,
  logging: false,
  charset: "utf8mb4",
  extra: {
    connectionLimit: 10,           // 最大连接数
    waitForConnections: true,      // 是否等待连接池中的连接
    queueLimit: 0,                 // 队列中的最大连接数，0 表示不限制
  },
});


export const getRepository = async <T extends ObjectLiteral>(
  entity: EntityTarget<T>
) => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  return AppDataSource.getRepository(entity);
};
