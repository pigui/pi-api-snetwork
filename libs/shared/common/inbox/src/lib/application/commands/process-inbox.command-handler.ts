import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ProcessInboxCommand } from './process-inbox.command';
import { Inbox } from '../entities/inbox';
import { Observable, catchError, lastValueFrom, map, of, tap } from 'rxjs';
import { DeleteInboxCommand } from './delete-inbox.command';

@CommandHandler(ProcessInboxCommand)
export class ProcessInboxCommandHandler
  implements ICommandHandler<ProcessInboxCommand, Inbox>
{
  constructor(private readonly eventBus: EventBus) {}
  execute({ client, inbox }: ProcessInboxCommand): Promise<Inbox> {
    const process$: Observable<Inbox> = client
      .send(inbox.type, { ...inbox.payload })
      .pipe(
        map(() => inbox),
        tap(() => {
          this.eventBus.publish(new DeleteInboxCommand(inbox));
        }),
        catchError(() => of(inbox))
      );

    return lastValueFrom(process$);
  }
}
