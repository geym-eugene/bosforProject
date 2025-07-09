import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsPositive,
  IsEnum,
} from 'class-validator';
import { MaterialType, RoofType, StyleType } from '../entity';

export class CreateProjectDto {
  @ApiProperty({ example: 'Дом Сканди' })
  @IsString()
  @IsNotEmpty({
    message: 'Sosal?',
  })
  title: string;

  @ApiProperty({ example: 'Современный дом в скандинавском стиле' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 140 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  area_m2?: number;

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  floors?: number;

  @ApiProperty({ example: 'сип-панель' })
  @IsOptional()
  @IsEnum(MaterialType)
  material: MaterialType;

  @ApiProperty({ example: 'плоская' })
  @IsOptional()
  @IsEnum(RoofType)
  roof: RoofType;

  @ApiProperty({ example: 'хай-тек' })
  @IsOptional()
  @IsEnum(StyleType)
  style: StyleType;

  @ApiProperty({ example: 14500000 })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    example:
      'https://www.ccnova.ru/upload/resize_cache/iblock/8ef/8e1rimlj3ny6slsmc81gyxr3d12d7szp/800_500_0/310-Novatsiya_vid-1_variant-1.jpg',
  })
  @IsOptional()
  @IsString()
  image_preview?: string;

  @ApiProperty({ example: 'https://bosfor.s3/model/dom-skandi.glb' })
  @IsOptional()
  @IsString()
  model_3d_url?: string;

  @ApiProperty({ example: 'https://bosfor.s3/plans/dom-skandi.pdf' })
  @IsOptional()
  @IsString()
  plan_pdf_url?: string;
}
