import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectImage } from './entity';
import { Project } from '../project/entity';
import { Repository } from 'typeorm';
import { uploadPicture, deletePicture } from '../services/uploadService';

@Injectable()
export class ProjectImagesService {
  constructor(
    @InjectRepository(ProjectImage)
    private readonly imageRepo: Repository<ProjectImage>,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async uploadImage(projectId: number, file: Express.Multer.File) {
    const project = await this.projectRepo.findOne({
      where: { id: projectId },
      relations: ['images'],
    });
    if (!project) throw new NotFoundException('Проект не найден');

    const url = await uploadPicture(file);
    const isPreview = project.images.length === 0;

    const newImage = this.imageRepo.create({ url, isPreview, project });
    await this.imageRepo.save(newImage);

    const updatedImages = await this.imageRepo.find({
      where: { project: { id: projectId } },
      order: { id: 'ASC' },
    });

    return updatedImages;
  }

  async deleteImage(imageId: number) {
    const image = await this.imageRepo.findOne({
      where: { id: imageId },
      relations: ['project'],
    });
    if (!image) throw new NotFoundException('Изображение не найдено');

    const key = new URL(image.url).pathname.slice(1);
    await deletePicture(key);
    await this.imageRepo.remove(image);

    // Назначаем новый превью, если удалили текущее
    if (image.isPreview) {
      const images = await this.imageRepo.find({
        where: { project: image.project },
        order: { created_at: 'ASC' },
      });
      if (images[0]) {
        images[0].isPreview = true;
        await this.imageRepo.save(images[0]);
      }
    }

    return { success: true };
  }

  async markAsPreview(imageId: number) {
    const image = await this.imageRepo.findOne({
      where: { id: imageId },
      relations: ['project'],
    });
    if (!image) throw new NotFoundException('Изображение не найдено');

    await this.imageRepo.update(
      { project: image.project, isPreview: true },
      { isPreview: false },
    );

    image.isPreview = true;
    await this.imageRepo.save(image);

    return { success: true };
  }
}
