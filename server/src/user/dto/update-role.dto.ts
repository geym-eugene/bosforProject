import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entity';

export class UpdateUserRoleDto {
  @ApiProperty({ enum: UserRole, example: UserRole.MODER })
  @IsEnum(UserRole, { message: 'Недопустимая роль' })
  role: UserRole;
}
