import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/domain/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET ALL - Endpoint para obtener todos los usuarios
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  // GET ONE - Endpoint para obtener un usuario por ID
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(+id);
  }

  // CREATE - Endpoint para crear un usuario
  @Post()
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData);
  }

  // UPDATE - Endpoint para actualizar un usuario
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Partial<User>,
  ): Promise<User | null> {
    return this.userService.update(+id, userData);
  }

  // DELETE - Endpoint para eliminar un usuario
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    return this.userService.remove(+id);
  }
}