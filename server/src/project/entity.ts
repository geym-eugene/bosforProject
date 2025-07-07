import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ type: 'varchar', nullable: true, default: null })
  material: string;

  @Column({ type: 'decimal', nullable: true, default: null })
  price: number;

  @Column({ type: 'varchar', nullable: true, default: null })
  image_preview: string;

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
}
