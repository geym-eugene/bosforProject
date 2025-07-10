import { ProjectImage } from '../project-images/entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

export enum MaterialType {
  WOOD = 'дерево',
  BRICK = 'кирпич',
  SIP = 'сип-панель',
}

export enum RoofType {
  FLAT = 'плоская',
  GABLE = 'двускатная',
  HIP = 'четырёхскатная',
}

export enum StyleType {
  MINIMALISM = 'минимализм',
  SCANDI = 'сканди',
  HIGH_TECH = 'хай-тек',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @Column({ type: 'int', nullable: true, default: null })
  area_m2: number;

  @Column({ type: 'int', nullable: true, default: null })
  floors: number;

  @Column({ type: 'enum', enum: MaterialType, default: null })
  material: MaterialType;

  @Column({ type: 'enum', enum: RoofType, default: null })
  roof: RoofType;

  @Column({ type: 'enum', enum: StyleType, default: null })
  style: StyleType;

  @Column({ type: 'decimal', nullable: true, default: null })
  price: number;

  @Column({ type: 'varchar', nullable: true, default: null })
  model_3d_url: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  plan_pdf_url: string;

  @Column({ type: 'int', nullable: true, default: null })
  userId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ProjectImage, (image) => image.project, { cascade: true })
  images: ProjectImage[];
}
