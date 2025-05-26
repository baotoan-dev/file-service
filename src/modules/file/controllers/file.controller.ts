import { Controller } from '@nestjs/common';
import { FileService } from '../services/file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}
}
