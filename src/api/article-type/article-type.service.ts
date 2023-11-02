import { Injectable, HttpException } from '@nestjs/common';
import { CreateArticleTypeDto } from './dto/create-article-type.dto';
import { UpdateArticleTypeDto } from './dto/update-article-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { ArticleType } from './entities/article-type.entity';

@Injectable()
export class ArticleTypeService {
  constructor(
    @InjectRepository(ArticleType)
    private articleRepository: Repository<ArticleType>,
  ) {}

  /**
   * 创建文章分类
   * @param createArticleTypeDto
   * @returns
   */
  async create(createArticleTypeDto: CreateArticleTypeDto) {
    try {
      var article = await this.articleRepository.create(createArticleTypeDto);
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

  async find() {
    const res = await this.articleRepository.find();
    return {
      code: 200,
      data: res,
    };
  }

  /**
   * 分页查询文章分类列表
   * @param pageNo
   * @param pageSize
   * @param title
   * @param status
   * @returns
   */
  async findAll(pageNo: number, pageSize: number, title: string) {
    const skipCount = (pageNo - 1) * pageSize;
    //拼接筛选条件
    const condition: Record<string, any> = {};
    if (title) {
      condition.title = Like(`%${title}%`);
    }
    const { 0: articles, 1: total } = await this.articleRepository.findAndCount(
      {
        select: ['id', 'title', 'order_by', 'createAt'],
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
   * 根据Id查询文章分类详情
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

  async update(id: number, updateArticleTypeDto: UpdateArticleTypeDto) {
    try {
      var article = await this.articleRepository.create(updateArticleTypeDto);
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
   * 根据文章Id删除分类
   * @param id
   * @returns
   */
  async remove(id: string) {
    try {
      var article = await this.articleRepository.findOne({
        where: {
          id,
        },
      });

      console.log(article);
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
