import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../entities/file.entity';
import { ConfigService } from '@nestjs/config';
import { CreateFileDto } from '../dtos/create-file.dto';

@Injectable()
export class FileService {
  private fileServiceUrl: string;

  constructor(
    @InjectRepository(File)
    private fileRepo: Repository<File>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  create(data: CreateFileDto): Promise<File> {
    return this.fileRepo.save(data);
  }

  delete(id: number): Promise<void> {
    return this.fileRepo.delete(id).then(() => undefined);
  }

  findAll(): Promise<File[]> {
    return this.fileRepo.find();
  }

  findOne(id: number): Promise<File> {
    return this.fileRepo.findOneBy({ id });
  }
}
