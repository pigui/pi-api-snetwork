import { IsNotEmpty, IsString } from 'class-validator';

export class FindCommentByPostIdInput {
  @IsNotEmpty()
  @IsString()
  postId: string;
}
