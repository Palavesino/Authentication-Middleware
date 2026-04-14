import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt: Date | null;
}
