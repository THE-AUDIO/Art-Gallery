import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/login.dto';
import { Response,Request } from 'express';


@Controller('auth')
export class AuthController {
    // call a service
    constructor(private authService: AuthService){}

    // Implement Created acount 
    @Post('create')
    async createAccount(
        @Body() newUser: CreateUserDto
    ) {
        console.log(newUser);
        return await this.authService.create(newUser);
    }


    @Post('login')
    async GetOneUser(
        @Body() user: LoginUserDto,
    ){
        
        return await this.authService.loginUser(user); 
    }


    @Get('user')
    async getOneUser(
        @Req() req: Request,
    ){
        return await this.authService.getOneUser(req)
    }
}
