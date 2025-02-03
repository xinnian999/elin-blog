// src/entities/Article.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Category } from "./Category"; // 引入 Category 实体类
import { Expose } from "class-transformer";
import { Tag } from "./Tag";

@Entity("comment")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number; // 自动生成的主键

  @Column()
  avatar: string; // 用户头像

  @Column()
  nickname: string; // 用户昵称

  @Column("text")
  content: string; // 评论内容

  @CreateDateColumn()
  created_at: Date; // 评论时间
}
