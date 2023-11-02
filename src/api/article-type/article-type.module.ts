import { Module } from '@nestjs/common';
import { ArticleTypeService } from './article-type.service';
import { ArticleTypeController } from './article-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleType } from './entities/article-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleType])],
  controllers: [ArticleTypeController],
  providers: [ArticleTypeService],
})
export class ArticleTypeModule {}
