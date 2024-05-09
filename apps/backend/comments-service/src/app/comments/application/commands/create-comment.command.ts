import { User } from '@app/shared/entities';
import { ICommand } from '@nestjs/cqrs';

export class CreateCommentCommand implements ICommand {
  constructor(
    public readonly content: string,
    public readonly postId: string,
    public readonly user: User
  ) {}
}
