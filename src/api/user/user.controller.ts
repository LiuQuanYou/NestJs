import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiResponse,
  ApiOperation,
  ApiQuery,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '注册用户', description: '注册用户接口' })
  @ApiTags('用户')
  @ApiResponse({
    status: 200,
    description: '注册成功',
    type: String,
  })
  @ApiQuery({
    name: 'userName',
    required: true,
    description: '用户名',
  })
  @ApiQuery({
    name: 'password',
    required: true,
    description: '密码',
  })
  @Post('register')
  register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @ApiTags('用户')
  @ApiOperation({ summary: '查询所有用户', description: '查询所有用户接口' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('getUserList')
  findAll() {
    return this.userService.findAll();
  }

  @ApiTags('用户')
  @ApiOperation({ summary: '获取登录用户信息', description: '获取登录用户信息接口' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('getUserInfo')
  getUserInfo(@Req() req) {
    return {
      code: 200,
      data: req.user,
    };
  }
}
