import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { BlacklistService } from './blacklist.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('ACCESS_TOKEN_SECRET');
        if (!secret) {
          throw new Error('ACCESS_TOKEN_SECRET not configured');
        }
        return {
          secret: secret,
          signOptions: { expiresIn: '15m' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, BlacklistService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
