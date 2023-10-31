export class CreateArticleDto {
  title: string;
  preview_img?: string;
  status: number;
  order_by?: number;
  rich_text?: string;
}
