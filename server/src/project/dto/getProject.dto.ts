import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ example: 'дерево' })
  material?: string;

  @ApiProperty({ example: 14500000 })
  price?: number;

  @ApiProperty({
    example:
      'https://www.ccnova.ru/upload/resize_cache/iblock/8ef/8e1rimlj3ny6slsmc81gyxr3d12d7szp/800_500_0/310-Novatsiya_vid-1_variant-1.jpg',
  })
  image_preview?: string;

  @ApiProperty({ example: 'https://bosfor.s3/model/dom-skandi.glb' })
  model_3d_url?: string;

  @ApiProperty({ example: 'https://bosfor.s3/plans/dom-skandi.pdf' })
  plan_pdf_url?: string;
}
