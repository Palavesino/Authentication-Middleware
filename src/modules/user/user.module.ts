import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../../domain/entities/user.entity';
import { AuthTokenModule } from '../auth-token/auth-token.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),AuthTokenModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], 
})
export class UserModule {}