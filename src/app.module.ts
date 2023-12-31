import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './api/menu/menu.module';
import { UploadModule } from './api/upload/upload.module';
import { ArticleModule } from './api/article/article.module';
import { ArticleTypeModule } from './api/article-type/article-type.module';
@Module({
  imports: [
    JwtModule.register({
      secret: 'yxn123', // 密钥，用于签名和验证令牌
      signOptions: { expiresIn: '1h' }, // 令牌的过期时间，这里设置为1小时
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'WIN-3ALQASNFPKT',
      port: 1433,
      username: 'sa',
      password: '123456',
      database: 'N-blog',
      autoLoadEntities: true,
      synchronize: true,
      options: {
        encrypt: false, // 禁用SSL加密
      },
    }),
    UserModule,
    AuthModule,
    MenuModule,
    UploadModule,
    ArticleModule,
    ArticleTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
