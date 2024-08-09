import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import { postDto } from './dto/post.dto';
import { PostService } from './post.service';

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
        @Body() post: postDto,
        @UploadedFile() file: Express.Multer.File
    ){
       return await this.postService.createPost(post, file)
    }
}
