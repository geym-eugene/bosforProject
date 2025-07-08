import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // Получить всех юзеров

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  // Поиск по ID (для JWT стратегии)
  async findById(id: number): Promise<User | null> {
    return this.userRepo.findOne({
      where: { id },
      select: ['id', 'email', 'role', 'username', 'avatar'], // Выбираем только нужные поля
    });
  }

  // вариант с полной сущностью
  async findFullUserById(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
      select: ['id', 'email', 'username', 'role', 'hashedPassword'],
    });
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  // Смена роли пользователя Админом

  async updateRole(id: number, newRole: UserRole): Promise<void> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('Пользователь не найден');
    user.role = newRole;
    await this.userRepo.save(user);
  }
}
