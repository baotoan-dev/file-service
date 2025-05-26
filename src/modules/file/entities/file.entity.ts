import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null, type: 'uuid' })
  userId: string;

  @Column()
  filename: string; // Tên file gốc

  @Column()
  path: string; // Đường dẫn lưu file trên server

  @Column({ nullable: true })
  mimetype: string; // Loại file (image/png, application/pdf, ...)

  @Column({ nullable: true })
  size: number; // Kích thước file (bytes)

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
