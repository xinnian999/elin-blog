// src/entities/Category.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { Article } from "./Article";
import { Expose } from "class-transformer";

@Entity("tag")
export class Tag {
  @PrimaryGeneratedColumn()
  id: number; // 自动生成的主键

  @Column()
  name: string; // 标签名称

  @Column({ type: "text", nullable: true })
  description: string; // 分类描述，可选字段

  @CreateDateColumn()
  created_at: Date; // 创建时间

  @UpdateDateColumn()
  updated_at: Date; // 更新时间

  // One-to-many 多对多关系：一个标签对应多篇文章
  @ManyToMany(() => Article, (article) => article.tags)
  @JoinTable()
  articles: Article[];

  @Expose()
  get articleCount(): number {
    return this.articles?.length;
  }
}
