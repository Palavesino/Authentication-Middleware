import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { RegisterRequestDto } from '../../domain/dtos/register-request.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../../domain/dtos/user-response.dto';
import { AuthTokenService } from '../auth-token/auth-token.service';
import { AuthRequestDto } from '../../domain/dtos/auth-request.dto';
import { AuthResponseDto } from '../../domain/dtos/auth-response.dto';
import { Rol } from '../../domain/enum/rol';
import { CompleteUserResponseDto } from '../../domain/dtos/complete-user-response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authTokenService: AuthTokenService,
  ) { }

  // CREATE - Crear un nuevo usuario
  async create(userData: RegisterRequestDto): Promise<UserResponseDto> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const savedUser = await this.userRepository.save(this.userRepository.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      rol: Rol.USER
    }));

    return plainToInstance(UserResponseDto, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  // GET ALL - Obtener todos los usuarios
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }
  // GET ONE - Obtener un usuario por ID
  async findOne(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return null;

    return plainToInstance(CompleteUserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  // UPDATE - Actualizar un usuario
  async update(id: string, userData: Partial<User>): Promise<CompleteUserResponseDto | null> {
    await this.userRepository.update(id, userData);
    const updatedUser = await this.findOne(id);
    return plainToInstance(CompleteUserResponseDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }
  // user.service.ts
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }
  // DELETE - Eliminar un usuario
  async remove(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }

  async login(authRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOneBy({
      email: authRequestDto.email
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      authRequestDto.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return await this.authTokenService.generateToken(user);
  }

  async logout(userId: string): Promise<{ message: string }> {
    await this.authTokenService.removeToken(userId);
    return { message: 'Sesión cerrada exitosamente' };
  }
}