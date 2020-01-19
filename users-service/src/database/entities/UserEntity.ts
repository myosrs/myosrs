import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { UserSessionEntity as UserSession } from "./UserSessionEntity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid") id!: string;

  @Column() firstName!: string;
  @Column() lastName!: string;

  @Index({ unique: true })
  @Column()
  email!: string;

  @Column() passwordHash!: string;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @Column({ nullable: true }) deletedAt!: Date;

  @OneToMany(
    type => UserSession,
    session => session.user
  )
  sessions!: UserSession[];
}
