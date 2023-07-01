import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Task {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  status: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
