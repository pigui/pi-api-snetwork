import { RegisterInbox } from '@app/shared/common/inbox';
import { RedisPubSub } from '@app/shared/common/pub';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserDeletedEvent } from './user-deleted.event';

@EventsHandler(UserDeletedEvent)
export class UserDeletedEventHandler
  implements IEventHandler<UserDeletedEvent>
{
  constructor(
    private readonly redisPubSub: RedisPubSub,
    private readonly registerInbox: RegisterInbox
  ) {}
  handle(event: UserDeletedEvent) {
    // TODO register process
    this.redisPubSub.publish('userDeleted', { userDeleted: event.user });
  }
}
