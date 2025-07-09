import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/project/entity';

export class FavoriteResponseDto {
  @ApiProperty({ example: 1, description: 'ID избранного' })
  id: number;

  @ApiProperty({ type: () => Project })
  project: Project;
}
