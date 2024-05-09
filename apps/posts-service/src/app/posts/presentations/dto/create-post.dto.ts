import { User } from '@app/shared/entities';
import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmptyObject()
  user: User;
}
