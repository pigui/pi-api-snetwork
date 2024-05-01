import { User } from '@app/shared/entities';
import { ICommand } from '@nestjs/cqrs';

export class ComparePasswordCommand implements ICommand {
  constructor(public readonly user: User, public readonly password: string) {}
}
