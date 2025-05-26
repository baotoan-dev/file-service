import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../entities/file.entity';
import { ConfigService } from '@nestjs/config';
import { CreateFileDto } from '../dtos/create-file.dto';
import { v2 as cloudinary } from 'cloudinary';
import { isUUID } from 'class-validator';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private fileRepo: Repository<File>,
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    cloudinary.config({
      cloud_name: this.config.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.config.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.config.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadToCloudinary(file: Express.Multer.File, dto: CreateFileDto) {
    // 1) Upload buffer
    const streamUpload = (): Promise<any> =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (err, result) => (err ? reject(err) : resolve(result)),
        );
        stream.end(file.buffer);
      });

    const result = await streamUpload();

    // 2) Lưu DB
    const fileEntity = this.fileRepo.create({
      filename: file.originalname,
      path: result.secure_url,
      mimetype: file.mimetype,
      size: file.size ?? 0,
      userId: dto.userId && isUUID(dto.userId) ? dto.userId : null,
    });
    await this.fileRepo.save(fileEntity);

    return { cloudinary: result, file: fileEntity };
  }
}
