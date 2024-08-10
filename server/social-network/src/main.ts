import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const serviceAccount = require('../configs/private-key.json');
  if(!admin.apps.length){
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "gs://dare-social-network.appspot.com"
    });
  }
  await app.listen(3000);
}
bootstrap();
