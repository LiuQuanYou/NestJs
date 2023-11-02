import { Base } from 'libs/Entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Article } from '../../article/entities/article.entity';

@Entity('article_type')
export class ArticleType extends Base {
  @Column({
    type: 'nvarchar',
    length: 50,
    nullable: true,
    comment: '标题',
  })
  title: string;

  @Column({
    type: 'nvarchar',
    length: 100,
    nullable: true,
    comment: '排序',
  })
  order_by: number;

  @OneToMany(() => Article, (article) => article.type)
  articles: Article[];
}
