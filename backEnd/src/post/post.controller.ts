import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import { PostService } from './post.service';
import { Request } from 'express';

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
  async  newPost(
        @Body() post: string,
        @UploadedFile() file: Express.Multer.File,
        @Req() request: Request
    ){
        console.log(post, file);
       return await this.postService.createPost(post, file,request.cookies['authtoken'])

    }
}
