import { User } from '@app/shared/entities';
import { IsNotEmptyObject, IsObject } from 'class-validator';

export class FindCommentsByUser {
  @IsObject()
  @IsNotEmptyObject()
  user: User;
}
