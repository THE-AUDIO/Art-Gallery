import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import { PostService } from './post.service';
import { UserReq } from './decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { Request } from 'express';

@Controller('post')
export class PostController {
    constructor(
        private postService: PostService
    ){}
    @Post('/newPost')
    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
            destination: './photo-post',
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
  async  newPost(
        @Body() description: string,
        @UploadedFile() file: Express.Multer.File,
        @UserReq() user: any,
    ){
       return await this.postService.createPost(description, file,user)

    }

    @Get('all')
    async viewAllPost(){
        return await this.postService.viewAllPost()
    }
}
