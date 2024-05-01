import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInWithPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
