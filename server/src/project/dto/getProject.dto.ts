import { ApiProperty } from '@nestjs/swagger';
import { MaterialType, RoofType, StyleType } from '../entity';

export class GetProjectDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Дом Сканди' })
  title: string;

  @ApiProperty({ example: 'Современный дом в скандинавском стиле' })
  description?: string;

  @ApiProperty({ example: 140 })
  area_m2?: number;

  @ApiProperty({ example: 2 })
  floors?: number;

  @ApiProperty({ example: 'сип-панель' })
  material: MaterialType;

  @ApiProperty({ example: 'плоская' })
  roof: RoofType;

  @ApiProperty({ example: 'хай-тек' })
  style: StyleType;

  @ApiProperty({ example: 14500000 })
  price?: number;

  @ApiProperty({
    example: [
      'https://bosfor.s3/projects/1.jpg',
      'https://bosfor.s3/projects/2.jpg',
    ],
    description: 'Список всех изображений проекта',
  })
  images?: string[];

  @ApiProperty({ example: 'https://bosfor.s3/model/dom-skandi.glb' })
  model_3d_url?: string;

  @ApiProperty({ example: 'https://bosfor.s3/plans/dom-skandi.pdf' })
  plan_pdf_url?: string;
}
