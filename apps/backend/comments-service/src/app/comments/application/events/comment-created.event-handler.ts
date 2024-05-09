import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommentCreatedEvent } from './comment-created.event';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@EventsHandler(CommentCreatedEvent)
export class CommentCreatedEventHandler
  implements IEventHandler<CommentCreatedEvent>
{
  constructor(private readonly redisPubSub: RedisPubSub) {}
  handle(event: CommentCreatedEvent) {
    this.redisPubSub.publish('commentCreated', {
      commentCreated: event.comment,
    });
  }
}
