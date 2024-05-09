import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FindUserByEmailInput {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
}
