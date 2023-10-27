import { Get, HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../routers/auth/auth.service';

import { md5 } from 'src/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  /**
   * 用户注册
   * @param createUserDto
   * @returns
   */
  async register(createUserDto: CreateUserDto) {
    const { userName, password } = createUserDto;
    const existUser = await this.userRepository.findOneBy({
      userName,
    });
    if (existUser) {
      return {
        code: 500,
        errorMsg: '用户名已存在',
      };
    }
    // 对密码进行加密
    const newUser = new User();
    newUser.userName = userName;
    newUser.password = md5(password);
    try {
      return await this.userRepository.save(newUser);
    } catch (e) {
      return {
        code: 500,
        errorMsg: e.toString(),
      };
    }
  }

  /**
   * 登录
   * @param createUserDto
   * @returns
   */
  async login(createUserDto: CreateUserDto) {
    const { userName, password } = createUserDto;
    const existUser = await this.userRepository.findOne({
      where: {
        userName,
      },
      select: ['userName', 'password'],
    });
    if (!existUser) {
      throw new HttpException('用户不存在', 500);
    }
    if (existUser.password != md5(password)) {
      throw new HttpException('登录 token 错误，请重新登录', 500);
    }
    return {
      code: 200,
      data: existUser,
      token: this.authService.certificate(existUser), // 签发token
    };
  }

  @Get()
  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
