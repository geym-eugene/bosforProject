import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Favorite } from '../favorite/entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODER = 'moder',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, length: 50 })
  username: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  avatar: string;

  @Column({ type: 'varchar', select: false, name: 'hashed_password' }) // select: false — чтобы не светить пароль в ответах API
  hashedPassword: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Автоматически хешируем пароль перед сохранением
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.hashedPassword) {
      this.hashedPassword = await bcrypt.hash(this.hashedPassword, 10);
    }
  }

  // Метод для проверки пароля (удобно использовать при логине)
  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.hashedPassword);
  }
}
