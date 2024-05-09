import { IsNotEmpty, IsString } from 'class-validator';

export class FindCommentById {
  @IsNotEmpty()
  @IsString()
  id: string;
}
