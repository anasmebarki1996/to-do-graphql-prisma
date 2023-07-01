import { InputType, Field } from '@nestjs/graphql';
import { Comment } from '../entities/comment.entity';

@InputType()
export class CreateCommentInput implements Omit<Comment, 'id'> {
  @Field()
  text: string;

  @Field()
  taskId: number;

  @Field()
  userId: string;
}
