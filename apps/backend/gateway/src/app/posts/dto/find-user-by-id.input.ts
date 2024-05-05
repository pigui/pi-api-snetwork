import { IsNotEmpty, IsString } from 'class-validator';

export class FindPostByIdInput {
  @IsNotEmpty()
  @IsString()
  id: string;
}
