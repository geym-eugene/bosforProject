import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsPositive,
  IsEnum,
} from 'class-validator';
import { MaterialType, RoofType, StyleType } from '../entity';

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

  @ApiPropertyOptional({ example: 'сип-панель' })
  @IsOptional()
  @IsEnum(MaterialType)
  material: MaterialType;

  @ApiPropertyOptional({ example: 'плоская' })
  @IsOptional()
  @IsEnum(RoofType)
  roof: RoofType;

  @ApiPropertyOptional({ example: 'хай-тек' })
  @IsOptional()
  @IsEnum(StyleType)
  style: StyleType;

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
