import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity';
import { Project } from 'src/project/entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepo: Repository<Favorite>,
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  async addFavorite(user: User, projectId: number): Promise<Favorite> {
    const project = await this.projectRepo.findOne({
      where: { id: projectId },
    });
    if (!project) throw new NotFoundException('Проект не найден');

    const favorite = this.favoriteRepo.create({ user, project });
    return this.favoriteRepo.save(favorite);
  }

  async removeFavorite(user: User, projectId: number): Promise<void> {
    await this.favoriteRepo.delete({
      user: { id: user.id },
      project: { id: projectId },
    });
  }

  async getFavorites(user: User): Promise<Favorite[]> {
    return this.favoriteRepo.find({
      where: { user: { id: user.id } },
      relations: ['project'],
    });
  }

  async isFavorite(user: User, projectId: number): Promise<boolean> {
    const favorite = await this.favoriteRepo.findOne({
      where: { user: { id: user.id }, project: { id: projectId } },
    });
    return !!favorite;
  }
}
