import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("article")
export class Article {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  // 无限长字符串
  @Column({
    type: "text",
  })
  content: string;
}
