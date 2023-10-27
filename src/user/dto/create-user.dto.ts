import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9#$%_-]+$/, {
    message: '用户名只能是字母、数字或者 #、$、%、_、- 这些字符',
  })
  userName: string;

  @Length(6, 30, { message: '密码格式错误。' })
  password: string;
}
