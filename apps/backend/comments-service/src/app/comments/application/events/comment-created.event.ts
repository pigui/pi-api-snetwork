import { IEvent } from '@nestjs/cqrs';
import { Comment } from '../entities/comment';

export class CommentCreatedEvent implements IEvent {
  constructor(public readonly comment: Comment) {}
}
