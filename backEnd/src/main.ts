import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv"
import * as cookieParser from 'cookie-parser';

dotenv.config()
async function bootstrap() {  
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const corsOption = {
    origin: ['http://127.0.0.1:5500/front-end/inscription/inscription.html?']
  }
  app.enableCors(corsOption)
  await app.listen(3000);
}
bootstrap();
