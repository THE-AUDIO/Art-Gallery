import { Injectable } from '@nestjs/common';
import { postDto } from './dto/post.dto'; // Assurez-vous que le nom du fichier DTO est correct
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    async addPost(postnow: postDto): Promise<Post> {
        const tempUser = await this.userRepository.findOneBy({ userName: postnow.userName });
        
        if (!tempUser) {
            throw new Error('User not found'); // Gère le cas où l'utilisateur n'est pas trouvé
        }

        const info = {
            description: postnow.description,
            createdAt: '',
            nbLikes: 0,
            linkPhoto: postnow.linkPhoto,
            user: tempUser
        };

        const newPost =  this.postRepository.create()
        

        const savedPost = await this.postRepository.save(newPost);
        return savedPost;
    }
}
