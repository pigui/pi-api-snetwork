import { ICommand } from '@nestjs/cqrs';
import { User } from '../entities/user';

export class DeleteUserCommand implements ICommand {
  constructor(public readonly user: User) {}
}
