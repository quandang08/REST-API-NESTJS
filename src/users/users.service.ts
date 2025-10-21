import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  //create
  async createUser(name: string, password: string): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({ name });
    if (existingUser) {
      throw new Error('User with this name already exists');
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({ name, password: hashed });
    return this.usersRepository.save(newUser);
  }

  //update
  async updateUser(
    id: number,
    name?: string,
    password?: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (name) user.name = name;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    return this.usersRepository.save(user);
  }

  //delete
  async deleteUser(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
