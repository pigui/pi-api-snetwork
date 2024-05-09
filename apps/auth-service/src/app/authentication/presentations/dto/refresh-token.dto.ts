import { User } from '@app/shared/entities';
import {
  IsJWT,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
} from 'class-validator';
export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  token: string;

  @IsNotEmptyObject()
  @IsObject()
  user: User;
}
