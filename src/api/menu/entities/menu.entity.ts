import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from 'libs/Entities/base.entity';

@Entity('menu')
export class Menu extends Base {
  @Column({
    type: 'nvarchar',
    length: 50,
    nullable: true,
    comment: '',
  })
  title: string;

  @Column({
    type: 'nvarchar',
    length: 50,
    nullable: true,
    comment: '',
  })
  label: string;

  @Column({
    type: 'nvarchar',
    length: 50,
    nullable: true,
    comment: '',
  })
  key: string;

  @Column({
    type: 'nvarchar',
    length: 50,
    nullable: true,
    comment: '',
  })
  icon: string;

  @Column({
    type: 'nvarchar',
    length: 50,
    nullable: true,
    comment: '',
  })
  path: string;

  @Column({
    type: 'nvarchar',
    length: 50,
    nullable: true,
    comment: '',
  })
  parent_id: string;

  @Column({
    type: 'int',
    nullable: true,
    comment: '',
  })
  status: number;

  @Column({
    type: 'int',
    nullable: true,
    comment: '',
  })
  order_by: number;

  @Column({
    type: 'int',
    nullable: true,
    comment: '',
  })
  page_type: number;
}
