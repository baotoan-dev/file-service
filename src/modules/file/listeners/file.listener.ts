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

  @MessagePattern('file_delete')
  delete(@Payload() id: number) {
    console.log('Deleting file with ID:', id);
    return this.fileService.delete(id);
  }

  @MessagePattern('file_find_all')
  findAll() {
    console.log('Finding all files');
    return this.fileService.findAll();
  }

  @MessagePattern('file_find_one')
  findOne(@Payload() id: number) {
    console.log('Finding file with ID:', id);
    return this.fileService.findOne(id);
  }
}
