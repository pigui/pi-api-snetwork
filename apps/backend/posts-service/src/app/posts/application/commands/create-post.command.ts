import { User } from '@app/shared/entities';
import { ICommand } from '@nestjs/cqrs';

export class CreatePostCommand implements ICommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly user: User
  ) {}
}
