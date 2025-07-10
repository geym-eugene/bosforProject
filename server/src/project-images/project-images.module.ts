import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectImage } from './entity';
import { Project } from '../project/entity';
import { ProjectImagesController } from './project-images.controller';
import { ProjectImagesService } from './project-images.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectImage, Project])],
  controllers: [ProjectImagesController],
  providers: [ProjectImagesService],
  exports: [ProjectImagesService],
})
export class ProjectImagesModule {}
