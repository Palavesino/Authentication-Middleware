import { Module } from '@nestjs/common';
import { AuthTokenService } from './auth-token.service';
import { AuthTokenController } from './auth-token.controller';

@Module({
  controllers: [AuthTokenController],
  providers: [AuthTokenService],
})
export class AuthTokenModule {}
