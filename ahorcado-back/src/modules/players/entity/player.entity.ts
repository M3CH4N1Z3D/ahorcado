import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "players" })
export class Player {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 50, unique: false, name: "player_name" })
  name!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  score!: number;
}
