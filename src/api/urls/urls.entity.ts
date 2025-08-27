import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UrlsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'original_url' })
  originalUrl: string;

  @Column({ unique: true, name: 'shorted_url' })
  shortedUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
