import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { ProjectImagesService } from './project-images.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Project Images')
@ApiBearerAuth()
@Controller('api/project-images')
export class ProjectImagesController {
  constructor(private readonly projectImageService: ProjectImagesService) {}

  @ApiOperation({
    summary: 'Загрузить изображение проекта в S3 и сохранить в БД',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // именно так указываем файл
        },
      },
    },
  })
  @Post(':id/images')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Изображение успешно загружено' })
  async uploadImage(
    @Param('id') projectId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.projectImageService.uploadImage(projectId, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить изображение проекта' })
  @ApiResponse({ status: 200, description: 'Изображение успешно удалено' })
  async delete(@Param('id') id: number) {
    return await this.projectImageService.deleteImage(id);
  }
}
