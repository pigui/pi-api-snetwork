import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { UserSoftdeletedEvent } from './user-softdeleted.event';

@EventsHandler(UserSoftdeletedEvent)
export class UserSoftdeletedEventHandler
  implements IEventHandler<UserSoftdeletedEvent>
{
  constructor(private readonly redisPubSub: RedisPubSub) {}

  handle(event: UserSoftdeletedEvent) {
    this.redisPubSub.publish('userDeleted', { userDeleted: event.user });
  }
}
