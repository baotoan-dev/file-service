import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({ type: String, format: 'binary' })
  file: Express.Multer.File;

  @ApiPropertyOptional({ type: String, description: 'Id của người dùng' })
  userId: string;
}
