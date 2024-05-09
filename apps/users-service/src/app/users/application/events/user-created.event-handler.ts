import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from './user-created.event';
import { RedisPubSub } from '@app/backend/shared/common/pub';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  constructor(private readonly redisPubSub: RedisPubSub) {}

  handle(event: UserCreatedEvent) {
    this.redisPubSub.publish('userCreated', { userCreated: event.user });
  }
}
