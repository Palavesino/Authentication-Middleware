import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTokenService } from './auth-token.service';
import { AuthTokenController } from './auth-token.controller';
import { AuthToken } from '../../domain/entities/auth-token.entity';
import { AppModule } from '../../app.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthToken]),
    forwardRef(() => AppModule),
  ],
  controllers: [AuthTokenController],
  providers: [AuthTokenService],
  exports: [AuthTokenService],
})
export class AuthTokenModule { }