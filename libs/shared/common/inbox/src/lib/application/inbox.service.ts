import { Injectable, Logger } from '@nestjs/common';
import { EventBus, QueryBus } from '@nestjs/cqrs';
import { RegisterInboxEvent } from './events/register-inbox.event';
import { Inbox } from './entities/inbox';
import { ProcessInboxMessageQuery } from './queries/process-inbox-message.query';
import { ProcessInboxEvent } from './events/process-inbox.event';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class InboxService {
  private readonly logger = new Logger(InboxService.name);
  constructor(
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus
  ) {}

  register(
    type: string,
    target: string,
    payload: Record<string, unknown>
  ): void {
    this.logger.log('register');
    this.eventBus.publish(new RegisterInboxEvent(type, target, payload));
  }

  find(): Promise<Array<Inbox>> {
    return this.queryBus.execute(new ProcessInboxMessageQuery());
  }
  proccess(client: ClientProxy, inbox: Inbox): Promise<void> {
    return this.eventBus.publish(new ProcessInboxEvent(client, inbox));
  }
}
