import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { hashSync } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: createUserInput.email },
    });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = hashSync(createUserInput.password, 10) as string;

    const createdUser = await this.prismaService.user.create({
      data: {
        id: randomUUID(),
        ...createUserInput,
        password: hashedPassword,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    return createdUser;
  }

  async findOne(id: string): Promise<User> {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        tasks: true,
        comments: true,
      },
    });

    if (!foundUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    return foundUser;
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    if (updateUserInput.email) {
      const existingUser = await this.prismaService.user.findUnique({
        where: { email: updateUserInput.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new Error('Email already exists');
      }
    }

    const updatedUser = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserInput,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        tasks: true,
        comments: true,
      },
    });

    return updatedUser;
  }
}
