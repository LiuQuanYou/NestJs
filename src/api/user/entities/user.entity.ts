import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from 'libs/Entities/base.entity';

@Entity('user')
export class User extends Base {
  @Column({
    type: 'nvarchar',
    length: 50,
    nullable: true,
    comment: '用户头像',
  })
  avatar: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '用户名',
  })
  userName: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '密码',
  })
  password: string;

  @Column({
    type: 'nvarchar',
    length: 50,
    nullable: true,
    comment: '用户昵称',
  })
  nickName: string;

  @Column({
    nullable: true,
    comment: '角色',
  })
  role: string;

  @Column({
    nullable: true,
    comment: '邮箱',
  })
  email: string;

  @Column({
    nullable: true,
    comment: '性别',
  })
  sex: string;
}