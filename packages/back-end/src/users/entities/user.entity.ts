import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comment.entity';
import { Task } from 'src/tasks/entities/task.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password?: string;

  @Field(() => [Task], { nullable: true })
  tasks?: Task[];

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];
}
