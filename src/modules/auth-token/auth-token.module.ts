import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTokenService } from './auth-token.service';
import { AuthTokenController } from './auth-token.controller';
import { AuthToken } from '../../domain/entities/auth-token.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'tempSecretKey123',
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([AuthToken])
  ],
  controllers: [AuthTokenController],
  providers: [AuthTokenService],
  exports: [AuthTokenService],
})
export class AuthTokenModule { }