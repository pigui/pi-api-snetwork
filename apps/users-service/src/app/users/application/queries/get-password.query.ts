import { IQuery } from '@nestjs/cqrs';
import { User } from '../entities/user';

export class GetPasswordQuery implements IQuery {
  constructor(public readonly user: User) {}
}
