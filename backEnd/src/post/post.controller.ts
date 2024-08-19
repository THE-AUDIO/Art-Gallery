import { Body, Controller, Get, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import { PostService } from './post.service';
import { UserReq } from './decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { postDto } from './dto/post.dto';
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
        @Body() description: any,
        @UploadedFile() file: Express.Multer.File,
        @UserReq() user: any,
    ){ 
        console.log(description);
        
       return await this.postService.createPost(description.description, file,user)

    }

    @Get('all')
    async viewAllPost(){
        return await this.postService.viewAllPost()
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('mypost')
    async getAllPostforOneUser(
        @UserReq() user: any
    ){
        return await this.postService.getPostForOneUser(user.userName)
    }
    @Put('like')
    async updateNbLike(
        @Body() post: postDto
    ){  
        return await this.postService.updateNbLike(post)
    }
}
