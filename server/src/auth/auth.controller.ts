import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('refresh')
  async refresh(@Body('refreshToken') token: string) {
    return this.authService.refreshTokens(token);
  }

  @Post('logout')
  async logout(@Body('refreshToken') token: string) {
    await this.authService.logout(token);
    return { message: 'Logged out successfully' };
  }
}
