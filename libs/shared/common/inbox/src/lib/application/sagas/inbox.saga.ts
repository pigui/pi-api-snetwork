import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { RegisterInboxEvent } from '../events/register-inbox.event';
import { CreateInboxCommand } from '../commands/create-inbox.command';

@Injectable()
export class InboxSaga {
  @Saga()
  registerSaga = (
    events$: Observable<RegisterInboxEvent>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(RegisterInboxEvent),
      map((event: RegisterInboxEvent) => {
        return new CreateInboxCommand(event.type, event.target, event.payload);
      })
    );
  };
}
