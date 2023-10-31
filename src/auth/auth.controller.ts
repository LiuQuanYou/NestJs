import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';
import {
  ApiResponse,
  ApiOperation,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { Console } from 'console';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiTags('用户')
  @ApiOperation({ summary: '用户登录', description: '用户登录接口' })
  @ApiQuery({
    name: 'password',
    required: true,
    description: '密码',
  })
  @ApiQuery({
    name: 'username',
    required: true,
    description: '用户名',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '登录成功',
  })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  @ApiTags('用户')
  @ApiOperation({ summary: '刷新token', description: '刷新token接口' })
  async refresh(@Query('refresh_token') refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.secret,
      });
      console.log(payload.user);
      return this.authService.refresh_token(payload.user);
    } catch (e) {
      console.log(e.toString());
      throw new HttpException('token 已失效，请重新登录', 500);
    }
  }
}
