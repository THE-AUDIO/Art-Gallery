import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
     useFactory: ()=>({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '1d'}
     })
    }),
    MulterModule.register({
      dest:'./user-pdp'
    })
  ],
  providers: [UserService, JwtModule],

})
export class UserModule {}
