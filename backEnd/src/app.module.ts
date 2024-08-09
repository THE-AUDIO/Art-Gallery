import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { User } from './entities/user';
import { PostModule } from './post/post.module';
import { Post } from './entities/post';


dotenv.config()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type:'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User,Post],
      synchronize: true, // Assurez-vous que cette valeur est correcte pour votre environnement
    }),
    AuthModule,
    PostModule, // Assurez-vous que AuthModule est correctement configuré
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
