import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './entity';
import { CreateProjectDto } from './dto/createProject.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Post()
  create(@Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectService.create(dto);
  }
}
