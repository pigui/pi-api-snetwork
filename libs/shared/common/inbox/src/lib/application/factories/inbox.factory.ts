import { Injectable, Logger } from '@nestjs/common';
import { Inbox } from '../entities/inbox';
import { GenerateIdService } from '@app/shared/util/generate-id';
import { DateService } from '@app/shared/util/date';
import { InboxStatus } from '../entities/inbox-status';

@Injectable()
export class InboxFactory {
  private readonly logger = new Logger(InboxFactory.name);
  constructor(
    private readonly generateIdService: GenerateIdService,
    private readonly dateService: DateService
  ) {}
  create(
    type: string,
    target: string,
    payload: Record<string, unknown>
  ): Inbox {
    this.logger.log('create');
    const inboxId = this.generateIdService.generate();
    const now = this.dateService.now();
    const inbox = new Inbox(
      inboxId,
      type,
      target,
      new InboxStatus('pending'),
      payload,
      now
    );
    return inbox;
  }
}
