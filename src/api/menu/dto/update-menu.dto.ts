import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  id: string;
  label: string;
  path: string;
  page_type: number;
  status: number;
  order_by: number;
  parent_id: string;
  title: string;
  icon: string;
}
