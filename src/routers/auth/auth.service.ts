import { User } from 'src/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto-js';

@Injectable()
export class AuthService {
  public constructor(
    @InjectRepository(User) private user: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // JWT验证 - Step 3: 处理 jwt 签证
  public certificate(user: any): string {
    // 这里对jwt的内容采用了 crypto 中的aes的对称加密方法
    const payload = user;
    return this.jwtService.sign(payload);
  }
}
