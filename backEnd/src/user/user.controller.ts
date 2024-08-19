import { Controller, Get, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserReq } from 'src/post/decorators/user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
   @Put('profil') 
   @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
        destination: './user-pdp',
        filename: (req, file, cb) => {
            const name : string = file.originalname.split('.')[0];
            const tmp : Array<string> = file.originalname.split('.');
            const fileExtension: string = tmp[tmp.length - 1];
            const newFilename: string = name.split('.').join('_')+ '_'+ Date.now()+'.'+fileExtension;
            cb(null, newFilename);
        }
 
    })
   }))

  @UseGuards(JwtAuthGuard)
  async upDateProfil(
    @UserReq() user: any,
    @UploadedFile() file: Express.Multer.File,
   ){
     //user.userName is the username of the authenticated user
    return await this.userService.upDateProfil(user.userName, file)
    }

    @Get('all')
   async viewAllUser(){
      return await  this.userService.viewAllUser()
    }
}
