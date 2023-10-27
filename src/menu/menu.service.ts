import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';

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
    const { icon, label, page_type, path, parent_id, order_by, status } =
      createMenuDto;
    var menu = new Menu();
    menu.title = label;
    menu.label = label;
    menu.page_type = page_type;
    menu.path = path;
    menu.order_by = order_by;
    menu.status = status;
    if (parent_id) {
      menu.parent_id = parent_id;
    }
    if (icon) {
      menu.icon = icon;
    }
    try {
      await this.menuRepository.save(menu);
      return {
        code: 200,
        data: await this.menuRepository.find(),
      };
    } catch (e) {
      return {
        code: 500,
        errorMsg: e.toString(),
      };
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

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
