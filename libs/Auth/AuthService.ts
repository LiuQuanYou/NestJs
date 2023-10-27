import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async createToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload); // 生成令牌
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token); // 验证令牌
    } catch (error) {
      return null; // 令牌无效时返回 null
    }
  }
}
