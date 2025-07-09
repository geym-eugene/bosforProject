import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entity';
import { Project } from 'src/project/entity';
import { User } from 'src/user/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Project, User])],
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
