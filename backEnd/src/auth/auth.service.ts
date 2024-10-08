import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
      ) {}
    
    // Implement a create acount methode 
    async create(userData: CreateUserDto): Promise<User> {
        // Hash the password before saving it
        const salt = await bcrypt.genSalt();
        console.log(salt);
        const password = await bcrypt.hash(userData.password, 10);
        const role = 'artist'
        const newUser = {
            userName: userData.userName,
            email: userData.email,
            password,
            role: role,
            profilLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-F43pCDdWJiOb6iCizBPQW6_1g1blQhnJMzrMnIIsC4tndQqwz1Vu9ZHjo626EaaESeA&usqp=CAU' ,
            salt,
        }
        console.log(newUser);
        
        const user = this.usersRepository.create(newUser);
        // Await the save operation and capture the saved user object
        const savedUser = await this.usersRepository.save(user);
      
        // Return a partial user object with selected fields
        delete savedUser.password,
        delete savedUser.salt
        
        return  savedUser;
      }

      async loginUser(user: LoginUserDto){
        const newUser = await this.usersRepository.findOneBy({userName: user.userName})
        if(!newUser) {
           throw new Error ("User not found")
        } else{
          const isMatch = await bcrypt.compare(user.password, newUser.password)
          if(!isMatch) {
            throw new Error ("Invalid password")
          }
          const token = await this.jwtService.signAsync(user)
          return  {'token': token}
          
        }
      }

      

     async getOneUser(user: any){   
         const newUser =   await this.usersRepository.findOneBy({userName: user.userName})
         delete newUser.password;
         delete newUser.salt
         return newUser;
         
      }
}
