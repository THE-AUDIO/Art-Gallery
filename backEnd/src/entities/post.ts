import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
@Entity("Post")
export class Post {
    @PrimaryGeneratedColumn()
    postId: number;

    @Column()
    description: string;

    @Column()
    createdAt: string;

    @Column()

    nbLikes: number;

    @Column()
    linkPhoto: string;

    @ManyToOne(() => User, user => user.post)
    user: User;
}