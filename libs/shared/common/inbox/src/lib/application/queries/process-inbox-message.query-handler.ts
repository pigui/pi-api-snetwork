import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProcessInboxMessageQuery } from './process-inbox-message.query';
import { Inbox } from '../entities/inbox';
import { InboxRepository } from '../repositories/inbox.repository';
import { Observable, lastValueFrom } from 'rxjs';

@QueryHandler(ProcessInboxMessageQuery)
export class ProcessInboxMessageQueryHandler
  implements IQueryHandler<ProcessInboxMessageQuery, Array<Inbox>>
{
  constructor(private readonly inboxRepository: InboxRepository) {}
  execute(): Promise<Array<Inbox>> {
    const inboxs$: Observable<Array<Inbox>> =
      this.inboxRepository.findStatus('pending');
    return lastValueFrom(inboxs$);
  }
}
