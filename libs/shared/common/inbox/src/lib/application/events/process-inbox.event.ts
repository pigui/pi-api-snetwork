import { IEvent } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { Inbox } from '../entities/inbox';

export class ProcessInboxEvent implements IEvent {
  constructor(
    public readonly client: ClientProxy,
    public readonly inbox: Inbox
  ) {}
}
