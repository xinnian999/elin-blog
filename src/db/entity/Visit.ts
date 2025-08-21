// src/entities/Category.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("visit")
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  visits: number;
}
