import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InboxCreatedEvent } from './inbox-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(InboxCreatedEventHandler)
export class InboxCreatedEventHandler
  implements IEventHandler<InboxCreatedEvent>
{
  private readonly logger = new Logger(InboxCreatedEventHandler.name);
  handle(event: InboxCreatedEvent): void {
    this.logger.log(event.inbox);
  }
}
