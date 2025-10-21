import {
  Controller,
  Get,
  Post,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // Get one user
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  async createUser(
    @Body() body: { name: string; password: string },
  ): Promise<User> {
    const { name, password } = body;
    return this.usersService.createUser(name, password);
  }

  // Update user
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name?: string; password?: string },
  ): Promise<User> {
    const { name, password } = body;
    return this.usersService.updateUser(id, name, password);
  }

  // Delete user
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
