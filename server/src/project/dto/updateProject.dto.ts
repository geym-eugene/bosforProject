import {
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  IsUrl,
} from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  title?: string;

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
  image_preview?: string;

  @IsOptional()
  @IsUrl()
  model_3d_url?: string;

  @IsOptional()
  @IsUrl()
  plan_pdf_url?: string;
}
