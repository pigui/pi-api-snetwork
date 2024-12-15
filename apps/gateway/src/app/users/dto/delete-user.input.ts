import { User } from '@app/shared/entities';
import { IsNotEmptyObject } from 'class-validator';

export class DeleteUserInput {
  @IsNotEmptyObject()
  user: User;
}
