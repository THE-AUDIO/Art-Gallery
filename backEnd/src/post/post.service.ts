import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user'; // Assurez-vous que le chemin d'importation est correct
import { Post } from '../entities/post'; // Assurez-vous que le chemin d'importation est correct
import { JwtService } from '@nestjs/jwt';
import { postDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }
  async createPost(description: string, file: Express.Multer.File, data: any): Promise<Post> {
    // Find the user by username
    const user = await this.userRepository.findOneBy({ userName: data.userName });
    if (!user) {
      throw new Error('User not found');
    }
    // Create a new post instance
    const newPost = this.postRepository.create();
    console.log(description);
    // Save the photo to the public/photo-post folder
    newPost.linkPhoto = `http://localhost:3000/photo-post/${file.filename}`
    newPost.description = description;
    newPost.createdAt = new Date().toISOString();
    newPost.nbLikes = 0;
    newPost.user = user;

    return await this.postRepository.save(newPost);
  }
  async viewAllPost() {
    return await this.postRepository.find()
  }
  async getPostForOneUser(userName: any){
    const newUser = await this.userRepository.findOneBy({userName: userName})
    return await this.postRepository.findBy({user: newUser})
  }

  async updateNbLike(post: postDto){
    const like = post.nbLikes + 1
    const nbUpdate =  await  this.postRepository.update(post.postId,{nbLikes: like})
    return nbUpdate;
  }
}
