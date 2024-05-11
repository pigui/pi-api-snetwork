import { IEvent } from '@nestjs/cqrs';

export class RegisterInboxEvent implements IEvent {
  constructor(
    public readonly type: string,
    public readonly target: string,
    public readonly payload: Record<string, unknown>
  ) {}
}
