import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ name: 'userName' })
  @IsString()
  @Matches(/^[a-zA-Z0-9#$%_-]+$/, {
    message: '用户名只能是字母、数字或者 #、$、%、_、- 这些字符',
  })
  userName: string;

  @ApiProperty({ name: 'password' })
  @Length(6, 30, { message: '密码格式错误。' })
  password: string;
}
