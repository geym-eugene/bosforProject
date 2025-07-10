import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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
    nullable: false,
  })
  project: Project;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
