import { IsNotEmpty, IsString } from 'class-validator';

export class FindCommentByPostId {
  @IsNotEmpty()
  @IsString()
  postId: string;
}
