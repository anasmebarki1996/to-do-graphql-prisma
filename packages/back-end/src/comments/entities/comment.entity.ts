import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field(() => Task, { nullable: true })
  task?: Task;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field()
  createdAt?: Date;

  @Field()
  deletedAt?: Date;
}
