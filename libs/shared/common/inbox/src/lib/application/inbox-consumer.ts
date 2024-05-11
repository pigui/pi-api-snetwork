import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { Inbox } from './entities/inbox';
import { Job } from 'bull';

@Processor('proccessInbox')
export class InboxConsumer {
  private readonly logger = new Logger(InboxConsumer.name);
  constructor(private readonly inboxService: InboxService) {}
  @Process()
  async processInboxMessage(job: Job<unknown>): Promise<void> {
    this.logger.log('processInboxMessage', job.id);
    const inboxs: Array<Inbox> = await this.inboxService.find();
  }
}
