import { IEvent } from '@nestjs/cqrs';
import { Inbox } from '../entities/inbox';

export class InboxCreatedEvent implements IEvent {
  constructor(public readonly inbox: Inbox) {}
}
