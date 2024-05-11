import { ICommand } from '@nestjs/cqrs';

export class CreateInboxCommand implements ICommand {
  constructor(
    public readonly type: string,
    public readonly target: string,
    public readonly payload: Record<string, unknown>
  ) {}
}
