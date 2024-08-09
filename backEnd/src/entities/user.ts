import { Optional } from "@nestjs/common";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post";
@Entity("User", { schema: "GALLERY" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "UserId" })
  userId: number;

  @Column("varchar", { name: "UserName", length: 20 })
  userName: string;

  @Column("varchar", { name: "Email", unique: true, length: 50 })
  email: string;

  @Column("text", { name: "Password" })
  password: string;

  @Column("varchar", { name: "Role", length: 50 })
  role: string;

  @Column()
  @Optional()
  profilLink: string;

  @Column()
  salt: string;

  @OneToMany(() => Post, post => post.user )
  post: Post[];
}
