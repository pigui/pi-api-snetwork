import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { RegisterInboxEvent } from '../events/register-inbox.event';
import { CreateInboxCommand } from '../commands/create-inbox.command';
import { ProcessInboxEvent } from '../events/process-inbox.event';
import { ProcessInboxCommand } from '../commands/process-inbox.command';

@Injectable()
export class InboxSaga {
  @Saga()
  registerInbox = (
    events$: Observable<RegisterInboxEvent>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(RegisterInboxEvent),
      map((event: RegisterInboxEvent) => {
        return new CreateInboxCommand(event.type, event.target, event.payload);
      })
    );
  };

  @Saga()
  processInbox = (
    events$: Observable<ProcessInboxEvent>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProcessInboxEvent),
      map(
        (event: ProcessInboxEvent) =>
          new ProcessInboxCommand(event.client, event.inbox)
      )
    );
  };
}
