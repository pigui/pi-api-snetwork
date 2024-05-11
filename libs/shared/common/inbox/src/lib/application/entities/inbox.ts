import { InboxStatus } from './inbox-status';

export class Inbox {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly target: string,
    public readonly status: InboxStatus,
    public readonly payload: Record<string, unknown>,
    public readonly createdAt: Date
  ) {}
}
