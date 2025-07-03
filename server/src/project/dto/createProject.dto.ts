import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsPositive,
  IsUrl,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty({
    message: 'Sosal?',
  })
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  area_m2?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  floors?: number;

  @IsOptional()
  @IsString()
  material?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsUrl()
  model_3d_url?: string;

  @IsOptional()
  @IsUrl()
  plan_pdf_url?: string;
}
