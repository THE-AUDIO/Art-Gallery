import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { Post } from 'src/entities/post';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [PostController],
  imports: [
    TypeOrmModule.forFeature([Post, User]),
    MulterModule.register({
      dest:'./photo-post' // dossier destination des images une fois uploader
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    })
  ],
  providers: [PostService, JwtModule],

})
export class PostModule {}
