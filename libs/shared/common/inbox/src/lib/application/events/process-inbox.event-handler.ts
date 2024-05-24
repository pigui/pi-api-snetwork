import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProcessInboxEvent } from './process-inbox.event';
import { Logger } from '@nestjs/common';

@EventsHandler(ProcessInboxEvent)
export class ProcessInboxEventHandler
  implements IEventHandler<ProcessInboxEvent>
{
  private readonly logger = new Logger(ProcessInboxEventHandler.name);
  handle({ inbox }: ProcessInboxEvent) {
    this.logger.log(inbox);
  }
}
