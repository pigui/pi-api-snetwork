import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserByIdInput {
  @IsNotEmpty()
  @IsString()
  id: string;
}
