import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Entity("comment")
export class Comment {
  @PrimaryGeneratedColumn()
  id?: number; // 自动生成的主键

  @Column()
  avatar: string; // 用户头像

  @Column()
  nickname: string; // 用户昵称

  @Column("text")
  content: string; // 评论内容

  @CreateDateColumn()
  created_at?: Date; // 评论时间

  // 父评论（如果存在）
  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true })
  parentComment?: Comment;

  // 子评论（回复）
  @OneToMany(() => Comment, (comment) => comment.parentComment)
  replies?: Comment[];

  // 目标评论（引用的评论）
  @ManyToOne(() => Comment, (comment) => comment.targetComments, { nullable: true })
  targetComment?: Comment;

  // 反向映射，指向目标评论的子评论
  @OneToMany(() => Comment, (comment) => comment.targetComment)
  targetComments?: Comment[];
}
