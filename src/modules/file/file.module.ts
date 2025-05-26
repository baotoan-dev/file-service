import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FileController } from './controllers/file.controller';
import { FileService } from './services/file.service';
import { FileListener } from './listeners/file.listener';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    HttpModule,
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'FILE_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: configService.get<string>('RABBITMQ_FILE_QUEUE'),
            queueOptions: { durable: true },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [FileController, FileListener],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
