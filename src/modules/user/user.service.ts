import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // GET ALL - Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // GET ONE - Obtener un usuario por ID
  async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  // CREATE - Crear un nuevo usuario
  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  // UPDATE - Actualizar un usuario
  async update(id: string, userData: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, userData);
    return this.findOne(id);
  }

  // DELETE - Eliminar un usuario
  async remove(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }
}