import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FavoriteResponseDto } from './dto/favorite-response.dto';

@Controller('api/favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post(':projectId')
  @ApiOperation({ summary: 'Добавить проект в избранное' })
  @ApiResponse({ status: 201, type: FavoriteResponseDto })
  async add(@Param('projectId') projectId: number, @Req() req: Request) {
    return this.favoriteService.addFavorite(req.user, projectId);
  }

  @Delete(':projectId')
  @ApiOperation({ summary: 'Удалить проект из избранного' })
  @ApiResponse({ status: 200, description: 'Удалено' })
  async remove(@Param('projectId') projectId: number, @Req() req: Request) {
    return this.favoriteService.removeFavorite(req.user, projectId);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список избранных проектов' })
  @ApiResponse({ status: 200, type: [FavoriteResponseDto] })
  async getAll(@Req() req: Request) {
    return this.favoriteService.getFavorites(req.user);
  }

  @Get('check/:projectId')
  @ApiOperation({ summary: 'Проверить, добавлен ли проект в избранное' })
  @ApiResponse({
    status: 200,
    schema: {
      example: { isFavorite: true },
    },
  })
  async isFavorite(@Param('projectId') projectId: number, @Req() req: Request) {
    const isFav = await this.favoriteService.isFavorite(req.user, projectId);
    return { isFavorite: isFav };
  }
}
