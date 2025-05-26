export class CreateFileDto {
  userId?: string; // ID của người dùng sở hữu file, nếu có
  filename: string;
  path: string;
  mimetype?: string;
  size?: number;
}
