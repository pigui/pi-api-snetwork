import { ICommand } from '@nestjs/cqrs';
import { User } from '../entities/user';

export class SoftdeleteUserCommand implements ICommand {
  constructor(public readonly user: User) {}
}
