import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async upDateProfil(username: string, file: Express.Multer.File): Promise<User> {
        let user = await this.userRepository.findOne({ where: { userName: username } });
        if(!user){
            throw new Error('User not found');
        }
        const newLink= `http://localhost:3000/user-pdp/${file.filename}`
           await  this.userRepository.update(user, {profilLink:newLink})
        return user;
    }

   async viewAllUser(){
        return await this.userRepository.find()
    }
}
