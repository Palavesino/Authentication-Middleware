import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../domain/entities/user.entity';
import { RegisterRequestDto } from '../../domain/dtos/register-request.dto';
import { UserResponseDto } from '../../domain/dtos/user-response.dto';
import { AuthRequestDto } from '../../domain/dtos/auth-request.dto';
import { AuthResponseDto } from '../../domain/dtos/auth-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // GET ALL - Endpoint para obtener todos los usuarios
  @Get()
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  // GET ONE - Endpoint para obtener un usuario por ID
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDto | null> {
    return this.userService.findOne(id);
  }

  // CREATE - Endpoint para crear un usuario
  @Post()
  async createUser(@Body() userData: RegisterRequestDto): Promise<UserResponseDto> {
    console.log("ENTRE" + JSON.stringify(userData, null, 2))
    return this.userService.create(userData);
  }

  // UPDATE - Endpoint para actualizar un usuario
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Partial<User>,
  ): Promise<UserResponseDto | null> {
    return this.userService.update(id, userData);
  }

  // DELETE - Endpoint para eliminar un usuario
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    return this.userService.remove(+id);
  }

   @Post('login')
  async login(@Body() authRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
    return await this.userService.login(authRequestDto);
  }

}