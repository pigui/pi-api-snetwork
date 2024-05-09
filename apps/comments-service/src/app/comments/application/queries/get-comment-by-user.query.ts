import { User } from '@app/shared/entities';
import { IQuery } from '@nestjs/cqrs';

export class GetCommentByUserQuery implements IQuery {
  constructor(public readonly user: User) {}
}
