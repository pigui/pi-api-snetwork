import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteInboxCommand } from './delete-inbox.command';
import { InboxRepository } from '../repositories/inbox.repository';
import { Observable, lastValueFrom } from 'rxjs';

@CommandHandler(DeleteInboxCommand)
export class DeleteInboxCommandHandler
  implements ICommandHandler<DeleteInboxCommand, void>
{
  constructor(private readonly inboxRepository: InboxRepository) {}
  execute(command: DeleteInboxCommand): Promise<void> {
    const post$: Observable<void> = this.inboxRepository.delete(command.inbox);
    return lastValueFrom(post$);
  }
}
