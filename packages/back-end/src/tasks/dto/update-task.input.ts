import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput {
  @Field(() => Int)
  id: number;

  @Field()
  status: string;
}
