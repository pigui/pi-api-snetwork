import { IEvent } from '@nestjs/cqrs';
import { Post } from '../entities/post';

export class PostCreatedEvent implements IEvent {
  constructor(public readonly post: Post) {}
}
