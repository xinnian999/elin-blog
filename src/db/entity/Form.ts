// src/entities/Category.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("form")
export class Form {
  @PrimaryGeneratedColumn()
  id: number; // 表单id

  @Column()
  name: string; // 表单名称

  @Column("text")
  schema: string; // 表单schema

  @CreateDateColumn()
  created_at: Date; // 创建时间

  @UpdateDateColumn()
  updated_at: Date; // 更新时间

}
