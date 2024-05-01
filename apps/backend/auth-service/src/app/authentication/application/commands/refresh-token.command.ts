import { User } from '@app/shared/entities';
import { ICommand } from '@nestjs/cqrs';

export class RefreshTokenCommand implements ICommand {
  constructor(public readonly user: User, public token: string) {}
}
