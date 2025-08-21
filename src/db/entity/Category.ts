// src/entities/Category.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Article } from "./Article";
import { Expose } from "class-transformer";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn()
  id: number; // 自动生成的主键

  @Column()
  name: string; // 分类名称

  @Column({ type: "text", nullable: true })
  description: string; // 分类描述，可选字段

  @CreateDateColumn()
  created_at: Date; // 创建时间

  @UpdateDateColumn()
  updated_at: Date; // 更新时间

  // One-to-many 关系：一个分类对应多篇文章
  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];

  @Expose()
  get articleCount(): number {
    return this.articles?.length;
  }
}
