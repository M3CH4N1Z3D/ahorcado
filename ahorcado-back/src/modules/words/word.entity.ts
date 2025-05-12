import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "words" })
export class Word {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 50, unique: true, name: "word" })
  word!: string;

  @Column({ type: "varchar", length: 1024, unique: false, name: "clue" })
  clue!: string;
}
