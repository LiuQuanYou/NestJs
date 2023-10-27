import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'libs/filters/http-exception.filter';
const port = process.env.SERVE_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //添加全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port);
}
bootstrap();
