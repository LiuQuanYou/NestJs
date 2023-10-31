import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/api/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { md5 } from 'src/utils';
import { ApiresultService } from 'libs/filters/apiresult.format';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  ApiResult = new ApiresultService();

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

    const payload = { sub: user.id, user: user };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: '30m',
    });
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return {
      code: 200,
      token: access_token,
      refresh_token,
      data: user,
    };
  }

  async refresh_token(user: any) {

    const payload = { sub: user.id, user: user };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: '30m',
    });
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      access_token,
      refresh_token,
    };
  }
}
