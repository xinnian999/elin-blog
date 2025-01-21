import { DataSource } from "typeorm";
import { Article } from "./entity/Article"; // 你需要定义数据库实体

export const AppDataSource = new DataSource({
  type: "mysql", // 或 'postgres' 等
  host: "localhost",
  port: 3306, // 端口，根据你的数据库配置
  username: "root",
  password: "991015",
  database: "blog",
  entities: [Article],
  synchronize: true, // 在开发环境下可以设置为 true，自动创建数据库表结构
  logging: false,
});

let isInitialized = false;

export const initializeTypeORM = async () => {
  if (!isInitialized) {
    await AppDataSource.initialize();
    isInitialized = true;
  }
};

export const fetchArticleData = async () => {
  await initializeTypeORM();

  const postRepository = AppDataSource.getRepository(Article);
  const data = await postRepository.find(); // 查询所有文章

  return data.map(item => ({ ...item }))
};

export { Article };
