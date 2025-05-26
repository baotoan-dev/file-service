// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Khởi động microservice
  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('File Service API')
    .setDescription('API documentation for File Service')
    .setVersion('1.0')
    .addBearerAuth() // 👈 thêm dòng này để Swagger nhận Bearer Token
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
