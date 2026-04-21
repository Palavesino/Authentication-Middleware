import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../domain/entities/user.entity';
import { RegisterRequestDto } from '../../domain/dtos/register-request.dto';
import { UserResponseDto } from '../../domain/dtos/user-response.dto';
import { AuthRequestDto } from '../../domain/dtos/auth-request.dto';
import { AuthResponseDto } from '../../domain/dtos/auth-response.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Rol } from '../../domain/enum/rol';

@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post('login')
  async login(@Body() authRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
    return await this.userService.login(authRequestDto);
  }
  @Post('logout')
  async logout(@Body('userId') userId: string): Promise<{ message: string }> {
    return await this.userService.logout(userId);
  }
  
  @Get('admin-only')
  @Roles(Rol.ADMIN)
  async adminOnly() {
    return 'Solo admins';
  }

  @Get('user-only')
  @Roles(Rol.USER)
  userOnly() {
    return 'Solo usuarios';
  }


  @Get('user-and-admin')
  @Roles(Rol.ADMIN, Rol.USER)
  userAndAdmin() {
    return 'Solo usuarios logueados (ADMIN o USER)';
  }

  @Get('public')
  public() {
    return 'Público';
  }
  // GET ALL - Endpoint para obtener todos los usuarios
  @Get()
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }


  // CREATE - Endpoint para crear un usuario
  @Post()
  async createUser(@Body() userData: RegisterRequestDto): Promise<UserResponseDto> {
    return this.userService.create(userData);
  }

  // GET ONE - Endpoint para obtener un usuario por ID
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDto | null> {
    return this.userService.findOne(id);
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
    return this.userService.remove(id);
  }



}