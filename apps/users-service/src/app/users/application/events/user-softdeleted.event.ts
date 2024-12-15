import { IEvent } from '@nestjs/cqrs';
import { User } from '../entities/user';

export class UserSoftdeletedEvent implements IEvent {
  constructor(public readonly user: User) {}
}
