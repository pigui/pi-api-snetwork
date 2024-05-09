import { AggregateRoot } from '@nestjs/cqrs';
import { Comment } from '../entities/comment';
import { CommentCreatedEvent } from '../events/comment-created.event';

export class CommentAggregateRoot extends AggregateRoot {
  create(post: Comment): void {
    this.apply(new CommentCreatedEvent(post));
  }
}
