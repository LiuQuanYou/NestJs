import { Injectable, HttpException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticleType } from '../article-type/entities/article-type.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    try {
      var article = await this.articleRepository.create(createArticleDto);
      await this.articleRepository.save(article);
      return {
        code: 200,
        message: '添加成功~',
        data: await this.articleRepository.find(),
      };
    } catch (e) {
      throw new HttpException(e.toString(), 500);
    }
  }

  /**
   * 根据筛选条件查询列表
   * @param pageNo  当前页码
   * @param pageSize  每页数量
   * @param title 搜索标题
   * @param status  状态
   * @returns
   */
  async findAll(
    pageNo: number,
    pageSize: number,
    title: string,
    status: number,
  ) {
    const skipCount = (pageNo - 1) * pageSize;

    //拼接筛选条件
    const condition: Record<string, any> = {};
    if (title) {
      condition.title = Like(`%${title}%`);
    }
    if (status) {
      condition.title = Like(`%${status}%`);
    }
    var { 0: articles, 1: total } = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndMapOne(
        'article.type',
        ArticleType,
        'type',
        'article.article_id=type.id',
      )

      .skip(skipCount)
      .take(pageSize)
      .where(condition)
      .orderBy('article.order_by', 'ASC')
      .getManyAndCount();

    return {
      code: 200,
      data: {
        articles,
        total,
      },
    };
  }

  /**
   * 根据文章id查询文章信息
   * @param id
   * @returns
   */
  async findOne(id: string) {
    try {
      var article = await this.articleRepository.find({
        where: {
          id,
        },
      });
      return {
        code: 200,
        data: article,
      };
    } catch (e) {
      throw new HttpException(e.toString(), 500);
    }
  }

  /**
   * 修改文章内容
   * @param updateArticleDto
   * @returns
   */
  async update(updateArticleDto: UpdateArticleDto) {
    try {
      var article = await this.articleRepository.create(updateArticleDto);
      await this.articleRepository.save(article);
      return {
        code: 200,
        message: '修改成功~',
      };
    } catch (e) {
      throw new HttpException(e.toString(), 500);
    }
  }

  /**
   * 删除文章
   * @param id 文章Id
   * @returns
   */
  async remove(id: string) {
    try {
      var article = await this.articleRepository.findOne({
        where: {
          id,
        },
      });

      if (article) {
        await this.articleRepository.remove(article);
        return {
          code: 200,
          message: '删除成功',
        };
      }
    } catch (e) {
      throw new HttpException(e.toString(), 500);
    }
  }
}
