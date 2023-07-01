import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { PrismaService } from 'src/prisma.service';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    const createdTask = await this.prismaService.task.create({
      data: createTaskInput,
    });

    return createdTask;
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.prismaService.task.findMany();

    return tasks;
  }

  async findOne(id: number): Promise<Task> {
    const foundTask = await this.prismaService.task.findUnique({
      where: {
        id,
      },
    });

    if (!foundTask) {
      throw new Error(`Task with ID ${id} not found`);
    }

    return foundTask;
  }

  async update(id: number, updateTaskInput: UpdateTaskInput): Promise<Task> {
    const foundTask = await this.prismaService.task.findUnique({
      where: {
        id,
      },
    });

    if (!foundTask) {
      throw new Error(`Task with ID ${id} not found`);
    }

    const updatedTask = await this.prismaService.task.update({
      where: {
        id,
      },
      data: updateTaskInput,
    });

    return updatedTask;
  }

  async remove(id: number): Promise<Task> {
    const deletedTask = await this.prismaService.task.delete({
      where: {
        id,
      },
    });

    return deletedTask;
  }
}
