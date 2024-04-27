import { AggregateRoot } from '@nestjs/cqrs';
import { User } from '../entities/user';
import { UserCreatedEvent } from '../events/user-created.event';

export class UserAggregateRoot extends AggregateRoot {
  create(user: User): void {
    this.apply(new UserCreatedEvent(user));
  }
}
