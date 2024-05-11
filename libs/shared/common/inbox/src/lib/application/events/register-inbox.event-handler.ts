import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RegisterInboxEvent } from './register-inbox.event';
import { Logger } from '@nestjs/common';

@EventsHandler(RegisterInboxEvent)
export class RegisterInboxEventHandler
  implements IEventHandler<RegisterInboxEvent>
{
  private readonly logger = new Logger(RegisterInboxEventHandler.name);
  handle(event: RegisterInboxEvent) {
    this.logger.log(event);
  }
}
