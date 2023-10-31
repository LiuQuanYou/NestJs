import { Injectable, HttpException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { ApiresultService } from 'libs/filters/apiresult.format';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  /**
   * 添加菜单
   * @param createMenuDto
   * @returns
   */
  async create(createMenuDto: CreateMenuDto) {
    try {
      var createParams = await this.menuRepository.create(createMenuDto);
      await this.menuRepository.save(createParams);
      return {
        code: 200,
        data: await this.menuRepository.find(),
      };
    } catch (e) {
      throw new HttpException(e.toString(), 500);
    }
  }

  /**
   * 获取菜单列表
   * @returns
   */
  async findAll() {
    return {
      code: 200,
      data: await this.menuRepository.find(),
    };
  }

  /**
   * 修改菜单
   * @param updateMenuDto
   */
  async update(updateMenuDto: UpdateMenuDto) {
    try {
      var { id } = updateMenuDto;
      var createParams = await this.menuRepository.create(updateMenuDto);
      await this.menuRepository.update(id, createParams);
      return {
        code: 200,
        data: await this.menuRepository.find(),
      };
    } catch (e) {
      throw new HttpException(e.toString(), 500);
    }
  }

  /**
   * 删除菜单
   * @param id 菜单Id
   * @returns
   */
  async delete(id: string) {
    try {
      await this.menuRepository.delete(id);
      return {
        code: 200,
        data: await this.menuRepository.find(),
      };
    } catch (e) {
      throw new HttpException(e.toString(), 500);
    }
  }
}
