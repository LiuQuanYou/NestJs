import { Column, Entity } from 'typeorm';
import { Base } from 'libs/Entities/base.entity';
import { max } from 'class-validator';

@Entity('article')
export class Article extends Base {
  @Column({
    type: 'nvarchar',
    length: 50,
    nullable: true,
    comment: '标题',
  })
  title: string;

  @Column({
    type: 'nvarchar',
    length: 50,
    nullable: true,
    comment: '预览图',
  })
  preview_img: string;

  @Column({
    type: 'nvarchar',
    length: 100,
    nullable: true,
    comment: '摘要',
  })
  abstract: string;
  
  @Column({
    type: 'int',
    nullable: true,
    comment: '',
  })
  status: number;

  @Column({
    type: 'nvarchar',
    length: 100,
    nullable: true,
    comment: '排序',
  })
  order_by: number;

  @Column({
    type: 'text',
    nullable: true,
    comment: '富文本',
  })
  rich_text: string;
}
