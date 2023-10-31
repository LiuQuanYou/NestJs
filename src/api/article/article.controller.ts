import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { generateParseIntPipe } from 'src/utils';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiTags('文章管理')
  @Post('add')
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get('getList')
  async findAll(
    @Query('pageNo', generateParseIntPipe('pageNo')) pageNo: number,
    @Query('pageSize', generateParseIntPipe('pageSize')) pageSize: number,
    @Query('title') title: string,
    @Query('status') status: number,
  ) {
    return await this.articleService.findAll(pageNo, pageSize, title, status);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOne(id);
  }

  @Post('update')
  async update(@Body() updateArticleDto: UpdateArticleDto) {
    return await this.articleService.update(updateArticleDto);
  }

  @Post('remove')
  async delete(@Body() body) {
    return await this.articleService.remove(body.id);
  }
}
