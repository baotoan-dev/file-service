import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { FileController } from './controllers/file.controller';
import { FileService } from './services/file.service';
import { FileListener } from './listeners/file.listener';
import { File } from './entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    HttpModule,
    ConfigModule.forRoot(),
  ],
  controllers: [FileController, FileListener],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
