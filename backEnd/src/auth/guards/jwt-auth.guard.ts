import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private jwtService: JwtService) {}
   canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const token = authHeader.split(' ')[1];  // Assume "Bearer <token>"
    try {
      const payload =  this.jwtService.verify(token);
      console.log(payload)
      delete payload.iat;
      delete payload.exp;
      
      request.user =  payload;  // Attach the payload to the request object
      return request;
    }
     catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
  }