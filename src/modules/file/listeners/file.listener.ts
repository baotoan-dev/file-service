import { Controller } from '@nestjs/common';
import { FileService } from '../services/file.service';

@Controller()
export class FileListener {
  constructor(private readonly fileService: FileService) {}
}
