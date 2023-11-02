import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticleType } from '../article-type/entities/article-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleType])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
