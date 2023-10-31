import {
  Get,
  HttpException,
  Inject,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { md5 } from 'src/utils';
import { ApiresultService } from 'libs/filters/apiresult.format';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  ApiResult = new ApiresultService();
    
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

  @Get()
  async findAll() {
    return await this.userRepository.find();
  }

  /**
   * 根据用户名称查询用户信息
   * @param userName 用户账号
   * @returns
   */
  async findOne(userName: string) {
    return await this.userRepository.findOne({
      where: {
        userName,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
