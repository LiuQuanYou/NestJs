import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string; // 主键，自动生成

  @CreateDateColumn({
    name: 'createAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @CreateDateColumn({
    name: 'updateAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
