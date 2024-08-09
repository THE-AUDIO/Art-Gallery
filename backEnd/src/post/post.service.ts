import { Injectable } from '@nestjs/common';
import { postDto } from './dto/post.dto'; // Assurez-vous que le nom du fichier DTO est correct
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { User } from '../entities/user'; // Assurez-vous que le chemin d'importation est correct
import { Post } from '../entities/post'; // Assurez-vous que le chemin d'importation est correct

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async createPost(createPostDto: postDto , file: Express.Multer.File): Promise<Post> {
        const { description, createdAt, nbLikes, linkPhoto, userId } = createPostDto;
        // Find the user by ID
        const user = await this.userRepository.findOneBy({ userId: userId });
        if (!user) {
          throw new Error('User not found');
        }
        
        // Create a new post instance
        const newPost = this.postRepository.create({
          description,
          createdAt,
          nbLikes,
          linkPhoto : `http://localhost:3000/photo-post${file.filename}`,
          user,
        });
    
        // Save the new post to the database
        return await this.postRepository.save(newPost);
      }
}