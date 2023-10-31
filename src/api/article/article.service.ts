import { Injectable, HttpException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    try {
      var article = await this.articleRepository.create(createArticleDto);
      console.log(article);
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
    const { 0: articles, 1: total } = await this.articleRepository.findAndCount(
      {
        select: [
          'id',
          'title',
          'abstract',
          'order_by',
          'preview_img',
          'status',
          'createAt',
        ],
        skip: skipCount,
        take: pageSize,
        where: condition,
      },
    );
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
      
      console.log(article)
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
