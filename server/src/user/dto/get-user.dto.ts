import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entity';

export class GetUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'ivanov' })
  username: string;

  @ApiProperty({ example: 'ivanov@example.com' })
  email: string;

  @ApiProperty({
    example: 'https://bosfor.s3/avatars/user123.png',
    required: false,
  })
  avatar?: string;

  @ApiProperty({ enum: UserRole, example: UserRole.USER })
  role: UserRole;

  @ApiProperty({ example: '2025-07-04T12:34:56.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-07-04T12:34:56.000Z' })
  updatedAt: Date;
}
