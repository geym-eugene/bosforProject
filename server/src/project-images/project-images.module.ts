import { Module } from '@nestjs/common';
import { ProjectImagesService } from './project-images.service';
import { ProjectImagesController } from './project-images.controller';

@Module({
  providers: [ProjectImagesService],
  controllers: [ProjectImagesController]
})
export class ProjectImagesModule {}
