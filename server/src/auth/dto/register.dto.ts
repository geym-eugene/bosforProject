import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'ivan' })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @ApiProperty({ example: 'ivan@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'qwerty123' })
  @IsString()
  @MinLength(6)
  password: string;
}
