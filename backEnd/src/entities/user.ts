import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
  salt: string;
}
