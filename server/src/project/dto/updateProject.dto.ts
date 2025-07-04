import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsPositive } from 'class-validator';

export class UpdateProjectDto {
  @ApiPropertyOptional({ example: 'Обновлённый проект' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Обновлённое описание дома' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 160 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  area_m2?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  floors?: number;

  @ApiPropertyOptional({ example: 'газобетон' })
  @IsOptional()
  @IsString()
  material?: string;

  @ApiPropertyOptional({ example: 17000000 })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ example: 'https://bosfor.s3/images/project1.jpg' })
  @IsOptional()
  @IsString()
  image_preview?: string;

  @ApiPropertyOptional({ example: 'https://bosfor.s3/models/project1.glb' })
  @IsOptional()
  @IsString()
  model_3d_url?: string;

  @ApiPropertyOptional({ example: 'https://bosfor.s3/plans/project1.pdf' })
  @IsOptional()
  @IsString()
  plan_pdf_url?: string;
}
