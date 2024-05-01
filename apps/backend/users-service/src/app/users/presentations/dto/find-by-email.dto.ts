import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FindUserByEmailDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
