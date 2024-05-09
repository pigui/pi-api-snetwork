import { User } from '@app/shared/entities';
import { IQuery } from '@nestjs/cqrs';

export class GetPostByUserQuery implements IQuery {
  constructor(public readonly user: User) {}
}
