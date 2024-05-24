import { Injectable } from '@nestjs/common';
import { InboxService } from './inbox.service';

@Injectable()
export class RegisterInbox {
  constructor(private readonly inboxService: InboxService) {}

  register(type: string, target: string, payload: Record<string, unknown>) {
    return this.inboxService.register(type, target, payload);
  }
}
