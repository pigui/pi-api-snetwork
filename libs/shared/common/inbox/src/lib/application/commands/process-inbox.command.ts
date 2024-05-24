import { ICommand } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { Inbox } from '../entities/inbox';

export class ProcessInboxCommand implements ICommand {
  constructor(
    public readonly client: ClientProxy,
    public readonly inbox: Inbox
  ) {}
}
