import { ICommand } from '@nestjs/cqrs';
import { Inbox } from '../entities/inbox';

export class DeleteInboxCommand implements ICommand {
  constructor(public readonly inbox: Inbox) {}
}
