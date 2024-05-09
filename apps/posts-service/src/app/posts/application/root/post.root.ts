import { AggregateRoot } from '@nestjs/cqrs';
import { Post } from '../entities/post';
import { PostCreatedEvent } from '../events/post-created.event';

export class PostAggregateRoot extends AggregateRoot {
  create(post: Post): void {
    this.apply(new PostCreatedEvent(post));
  }
}
