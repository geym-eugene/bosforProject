import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './entity';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetProjectDto } from './dto/getProject.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Request } from 'express';

@ApiTags('Projects')
@Controller('api/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Get()
  @ApiOperation({ summary: 'Получить все проекты' })
  @ApiResponse({
    status: 200,
    description: 'Список проектов',
    type: GetProjectDto,
    isArray: true,
  })
  getAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moder')
  @Post()
  @ApiOperation({ summary: 'Создать проект' })
  create(@Body() dto: CreateProjectDto, @Req() req: Request): Promise<Project> {
    const userId = req.user['id'];
    return this.projectService.create(dto, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moder')
  @Patch(':id')
  @ApiOperation({ summary: 'Редактировать проект' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProjectDto,
  ): Promise<Project> {
    console.log('dto', dto);
    return this.projectService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moder')
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить проект' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projectService.remove(id);
  }
}
