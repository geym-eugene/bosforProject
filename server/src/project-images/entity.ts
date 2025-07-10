import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../project/entity';

@Entity('project_images')
export class ProjectImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ name: 'is_preview', default: false })
  isPreview: boolean;

  @ManyToOne(() => Project, (project) => project.images, {
    onDelete: 'CASCADE',
  })
  project: Project;
}
