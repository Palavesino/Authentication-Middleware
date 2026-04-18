import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthToken } from '../../domain/entities/auth-token.entity';
import { AuthResponseDto } from '../../domain/dtos/auth-response.dto';
import { plainToInstance } from 'class-transformer';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class AuthTokenService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(AuthToken)
    private tokenRepository: Repository<AuthToken>,
  ) { }

  async generateToken(user: User): Promise<AuthResponseDto> {
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      rol: user.rol
    });
    const authToken = this.tokenRepository.create({
      token,
      user,
    });
    await this.tokenRepository.save(authToken);
    return plainToInstance(AuthResponseDto, { token }, {
      excludeExtraneousValues: true,
    });
  }


  // async removeToken(token?: string, user?: User) {
  //   if (token) {
  //     return await this.tokenRepository.delete({ token });
  //   } else if (user) {
  //     return await this.tokenRepository.delete({ user: { id: user.id } });
  //   } else {
  //     throw new Error('Debe proporcionar un token o un usuario');
  //   }
  // }

  async removeToken(userId: string): Promise<void> {
    await this.tokenRepository.delete({ user: { id: userId } });
  }
}