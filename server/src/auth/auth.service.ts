import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { BlacklistService } from './blacklist.service';
import { User } from '../user/entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly blacklistService: BlacklistService,
  ) {}

  async register(
    dto: RegisterDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const exists = await this.userService.findByEmail(dto.email);
    if (exists) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const user = await this.userService.create({
      username: dto.username,
      email: dto.email,
      hashedPassword: dto.password, // хеширование произойдёт в entity
    });

    return this.generateTokens(user);
  }

  async login(
    dto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.findByEmailWithPassword(dto.email);
    if (!user) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    const isValid = await user.comparePassword(dto.password);
    if (!isValid) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    return this.generateTokens(user);
  }

  // Обновление токенов с полной типизацией
  async refreshTokens(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      // Проверяем, не в чёрном списке ли токен
      if (this.blacklistService.isBlacklisted(refreshToken)) {
        throw new UnauthorizedException('Token revoked');
      }

      const payload = await this.jwtService.verifyAsync<{
        id: number;
        email: string;
      }>(refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });

      const user = await this.userService.findById(payload.id); //надо дописать юзерсервис
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return await this.generateTokens(user);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // Выход из системы с проверкой
  async logout(refreshToken: string): Promise<void> {
    try {
      // Проверяем валидность токена перед добавлением в чёрный список
      await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
      this.blacklistService.addToBlacklist(refreshToken);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  // Генерация новых токенов (добавляем полную типизацию)
  private async generateTokens(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = {
      id: user.id,
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
