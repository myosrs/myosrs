import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm"
import { UserEntity as User } from "./UserEntity"

@Entity({ name: "user_sesions" })
export class UserSessionEntity {
  @PrimaryGeneratedColumn("uuid") id!: string

  @ManyToOne(
    type => User,
    user => user.sessions
  )
  user!: User

  @CreateDateColumn() createdAt!: string
  @Column() expiresAt!: Date
}
