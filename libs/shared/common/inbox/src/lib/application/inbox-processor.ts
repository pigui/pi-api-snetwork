import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';

@Injectable()
export class InboxProcessor implements OnModuleInit {
  private readonly logger = new Logger(InboxProcessor.name);
  constructor(
    @InjectQueue('proccessInbox') private readonly inboxQueue: Queue
  ) {}

  onModuleInit(): void {
    this.inboxQueue.add(
      {},
      { repeat: { cron: CronExpression.EVERY_10_MINUTES } }
    );
  }
}
