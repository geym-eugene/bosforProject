import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './entity';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetProjectDto } from './dto/getProject.dto';

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

  @Post()
  @ApiOperation({ summary: 'Создать проект' })
  create(@Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Редактировать проект' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProjectDto,
  ): Promise<Project> {
    console.log('dto', dto);
    return this.projectService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить проект' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projectService.remove(id);
  }
}
