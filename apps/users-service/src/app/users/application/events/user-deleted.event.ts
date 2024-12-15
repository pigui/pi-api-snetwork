import { IEvent } from '@nestjs/cqrs';
import { User } from '../entities/user';

export class UserDeletedEvent implements IEvent {
  constructor(public readonly user: User) {}
}
