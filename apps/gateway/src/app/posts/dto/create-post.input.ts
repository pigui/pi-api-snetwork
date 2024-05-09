import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostInput {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
