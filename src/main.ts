import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'libs/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';

const port = process.env.SERVE_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //添加全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  //生成swagger接口文档。
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('博客系统Swagger')
    .setDescription('博客系统文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  //配置静态资源服务
  app.useStaticAssets('uploads', { prefix: '/uploads' });

  await app.listen(port);
}
bootstrap();
