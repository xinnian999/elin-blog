// src/entities/Article.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Category } from "./Category"; // 引入 Category 实体类
import { Expose } from "class-transformer";
import { Tag } from "./Tag";
import type { Comment } from "./Comment";

@Entity("article")
export class Article {
  @PrimaryGeneratedColumn()
  id: number; // 自动生成的主键

  @Column()
  title: string; // 文章标题

  @Column("text")
  content: string; // 文章内容

  @CreateDateColumn()
  created_at: Date; // 创建时间

  @UpdateDateColumn()
  updated_at: Date; // 更新时间

  @ManyToOne(() => Category, (category) => category.id, { nullable: false })
  category: Category; // 每篇文章属于一个分类

  @Expose() // 显示暴露 categoryId 字段，instanceToPlain时才会生效
  get categoryId(): number {
    return this.category?.id;
  }

  @Expose() // 显示暴露 categoryText 字段，instanceToPlain时才会生效
  get categoryText(): string {
    return this.category?.name;
  }

  @ManyToMany(() => Tag, (tag) => tag.articles, { nullable: true })
  @JoinTable()
  tags: Tag[];

  @Expose() // 显示暴露 categoryText 字段，instanceToPlain时才会生效
  get tagTexts(): string[] {
    return this.tags?.map((tag) => tag.name);
  }

  // 文章评论s
  @OneToMany("comment", (comment: Comment) => comment.parentArticle)
  comments?: Comment[];
}
