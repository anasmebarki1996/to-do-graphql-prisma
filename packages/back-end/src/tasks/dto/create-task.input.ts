import { InputType, Field } from '@nestjs/graphql';
import { Task } from '../entities/task.entity';

@InputType()
export class CreateTaskInput implements Omit<Task, 'id'> {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  status: string;

  @Field()
  userId: string;
}
