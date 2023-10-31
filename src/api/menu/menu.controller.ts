import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  Request,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(AuthGuard)
  @Post('getMenu')
  getMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.findAll();
  }

  @Post('addMenu')
  async addMenu(@Body() createMenuDto: CreateMenuDto) {
    return await this.menuService.create(createMenuDto);
  }

  @Post('editMenu')
  async editMenu(@Body() updateMenuDto: UpdateMenuDto) {
    return await this.menuService.update(updateMenuDto);
  }

  @Post('deleteMenu')
  async deleteMenu(@Body() body) {
    return await this.menuService.delete(body.id);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }
}
