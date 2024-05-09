import { IsNotEmpty, IsString } from 'class-validator';

export class FindCommentByIdInput {
  @IsNotEmpty()
  @IsString()
  id: string;
}
