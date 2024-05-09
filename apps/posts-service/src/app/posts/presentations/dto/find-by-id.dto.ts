import { IsNotEmpty, IsString } from 'class-validator';

export class FindPostByIdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
