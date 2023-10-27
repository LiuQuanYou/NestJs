import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { md5 } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * 验证登录信息
   * @param username
   * @param pass
   * @returns
   */
  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user?.password !== md5(pass)) {
      throw new HttpException('账号密码错误', 500);
    }

    const payload = { sub: user.id, username: user.userName };
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return {
      code: 200,
      token: await this.jwtService.signAsync(payload),
      user,
    };
  }
}
