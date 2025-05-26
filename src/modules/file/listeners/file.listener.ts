import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileService } from '../services/file.service';
import { CreateFileDto } from '../dtos/create-file.dto';

@Controller()
export class FileListener {
  constructor(private readonly fileService: FileService) {}

  @MessagePattern('file_create')
  create(@Payload() data: CreateFileDto) {
    console.log('Creating file with data:', data);
    return this.fileService.create(data);
  }
}
