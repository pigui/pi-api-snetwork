import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inbox } from '../entities/inbox';
import { CreateInboxCommand } from './create-inbox.command';
import { InboxRepository } from '../repositories/inbox.repository';
import { InboxFactory } from '../factories/inbox.factory';
import { Observable, lastValueFrom } from 'rxjs';

@CommandHandler(CreateInboxCommand)
export class CreateInboxCommandHandler
  implements ICommandHandler<CreateInboxCommand, Inbox>
{
  constructor(
    private readonly inboxRepository: InboxRepository,
    private readonly inboxFactory: InboxFactory
  ) {}
  execute(command: CreateInboxCommand): Promise<Inbox> {
    const createInbox = this.inboxFactory.create(
      command.type,
      command.target,
      command.payload
    );

    const inbox$: Observable<Inbox> = this.inboxRepository.create(createInbox);
    return lastValueFrom(inbox$);
  }
}
