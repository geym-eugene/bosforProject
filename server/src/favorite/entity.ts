import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from '../user/entity';
import { Project } from '../project/entity';

@Entity('favorites')
@Unique(['user', 'project'])
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Project, { onDelete: 'CASCADE', eager: true })
  project: Project;
}
