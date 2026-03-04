import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';

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
  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  // CREATE - Crear un nuevo usuario
  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  // UPDATE - Actualizar un usuario
  async update(id: number, userData: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, userData);
    return this.findOne(id);
  }

  // DELETE - Eliminar un usuario
  async remove(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }
}