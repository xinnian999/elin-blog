// src/entities/Category.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { LinkStatus } from "../enums";

@Entity("link")
export class Link {
  @PrimaryGeneratedColumn()
  id?: number; // 自动生成的主键

  @Column({
    enum: LinkStatus,
    type: "enum",
    default: LinkStatus['待审核'],
  })
  status?: LinkStatus; // 友联状态

  @Column()
  name: string; // 友链名称

  @Column({ type: "text", nullable: true })
  url: string; // 友链地址

  @Column({ type: "text", nullable: true })
  avatar: string; // 友链图片地址

  @Column({ type: "text", nullable: true })
  desc: string; // 友链描述

  @CreateDateColumn()
  created_at?: Date; // 创建时间

  @UpdateDateColumn()
  updated_at?: Date; // 更新时间

  @Column({ type: "text", nullable: true })
  email?: string; // 邮箱
}
