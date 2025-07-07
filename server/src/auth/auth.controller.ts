import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('refresh')
  @ApiOperation({ summary: 'Получить рефреш токен' })
  async refresh(@Body('refreshToken') token: string) {
    return this.authService.refreshTokens(token);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Выполнить выход' })
  async logout(@Body('refreshToken') token: string) {
    await this.authService.logout(token);
    return { message: 'Logged out successfully' };
  }

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Логин пользователя' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
