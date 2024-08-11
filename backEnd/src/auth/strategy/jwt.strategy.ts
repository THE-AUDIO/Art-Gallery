import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { LoginUserDto } from '../dto/login.dto';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),      
    });
    
  }

  async validate(payload: LoginUserDto) {
     const user = await this.userRepository.findOneByOrFail({userName: payload.userName});
      
    if (!user) {
      console.log('Aucun utilisateur trouvé');
      throw new UnauthorizedException('Utilisateur non autorisé');
    }

    delete user.password;
    return user;
  }
}
