import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ArticleTypeService } from './article-type.service';
import { CreateArticleTypeDto } from './dto/create-article-type.dto';
import { UpdateArticleTypeDto } from './dto/update-article-type.dto';
import { generateParseIntPipe } from 'src/utils';

@Controller('article-type')
export class ArticleTypeController {
  constructor(private readonly articleTypeService: ArticleTypeService) {}

  @Post('create')
  create(@Body() createArticleTypeDto: CreateArticleTypeDto) {
    return this.articleTypeService.create(createArticleTypeDto);
  }

  @Get('getList')
  getList() {
    return this.articleTypeService.find();
  }

  @Get()
  findAll(
    @Query('pageNo', generateParseIntPipe('pageNo')) pageNo: number,
    @Query('pageSize', generateParseIntPipe('pageSize')) pageSize: number,
    @Query('title') title: string,
  ) {
    return this.articleTypeService.findAll(pageNo, pageSize, title);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleTypeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArticleTypeDto: UpdateArticleTypeDto,
  ) {
    return this.articleTypeService.update(+id, updateArticleTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleTypeService.remove(id);
  }
}
