// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Mở CORS cho tất cả origin (hoặc cấu hình theo ý bạn)
  app.enableCors();

  // Khởi động microservice
  await app.startAllMicroservices();

  // add prefix api
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('File Service API')
    .setDescription('API documentation for File Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
