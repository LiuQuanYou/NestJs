export class CreateMenuDto {
  label?: string;
  path?: string;
  page_type?: number;
  status: number;
  order_by: number;
  parent_id?: string;
  title: string;
  icon?: string;
}
