import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('refresh')
  @ApiOperation({ summary: 'Получить рефреш токен' })
  async refresh(@Req() req: Request) {
    const token: string = req.cookies['refreshToken'] as string;
    return this.authService.refreshTokens(token);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Выход из системы (очищает refreshToken)' })
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: UserResponseDto; accessToken: string }> {
    const { user, accessToken, refreshToken } =
      await this.authService.register(dto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const safeUser = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });

    return {
      user: safeUser,
      accessToken,
    };
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: UserResponseDto; accessToken: string }> {
    const { accessToken, refreshToken, user } =
      await this.authService.login(dto);

    // Ставим куку
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Возвращаем user без password
    const safeUser = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });

    return {
      user: safeUser,
      accessToken,
    };
  }
}
