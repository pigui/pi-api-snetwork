import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PostCreatedEvent } from './post-created.event';
import { RedisPubSub } from '@app/shared/common/pub';

@EventsHandler(PostCreatedEvent)
export class PostCreatedEventHandler
  implements IEventHandler<PostCreatedEvent>
{
  constructor(private readonly redisPubSub: RedisPubSub) {}
  handle(event: PostCreatedEvent) {
    this.redisPubSub.publish('postCreated', { postCreated: event.post });
  }
}
