import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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
                const tmp : Array<string> = file.originalname.split('.')
                const newFilename: string = name.split('.').join('_')+ '_'+ Date.now()+'.'+file.originalname.split('.')[1];
                cb(null, newFilename);
            }
        })
    }))
  @UseGuards(JwtAuthGuard)
  async  newPost(
        @Body() post: string,
        @UploadedFile() file: Express.Multer.File,
        @UserReq() user: any,
    ){
       return await this.postService.createPost(post, file,user)

    }
}
