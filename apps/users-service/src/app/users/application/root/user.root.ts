import { AggregateRoot } from '@nestjs/cqrs';
import { User } from '../entities/user';
import { UserCreatedEvent } from '../events/user-created.event';
import { UserDeletedEvent } from '../events/user-deleted.event';
import { UserSoftdeletedEvent } from '../events/user-softdeleted.event';

export class UserAggregateRoot extends AggregateRoot {
  create(user: User): void {
    this.apply(new UserCreatedEvent(user));
  }
  delete(user: User): void {
    this.apply(new UserDeletedEvent(user));
  }

  softdelete(user: User): void {
    this.apply(new UserSoftdeletedEvent(user));
  }
}
