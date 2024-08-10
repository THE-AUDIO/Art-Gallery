import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { User } from '../entities/user'; // Assurez-vous que le chemin d'importation est correct
import { Post } from '../entities/post'; // Assurez-vous que le chemin d'importation est correct
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}
    async createPost(description: any , file: Express.Multer.File, cookie: string): Promise<Post> {
      console.log('file dans le service'+ file);
        //decode a cookie using jwt service
        const userdecode = await this.jwtService.verifyAsync(cookie)
        // Find the user by ID
        const user = await this.userRepository.findOneBy({ userName: userdecode.userName });
        if (!user) {
          throw new Error('User not found');
        }
        const userId = userdecode.userId;
        // Create a new post instance
        const newPost = this.postRepository.create();
      
        // Save the photo to the public/photo-post folder
        newPost.linkPhoto = `http://localhost:3000/photo-post${file.filename}`
        newPost.description = description;
        newPost.createdAt = new Date().toISOString();
        newPost.nbLikes = 0;
        newPost.user = user;

        return await this.postRepository.save(newPost);
      }
}
