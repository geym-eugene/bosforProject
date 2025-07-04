import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Поиск по ID (для JWT стратегии)
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'email'], // Выбираем только нужные поля
    });
  }

  // вариант с полной сущностью
  async findFullUserById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }
}
