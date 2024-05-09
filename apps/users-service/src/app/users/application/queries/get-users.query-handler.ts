import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user.repository';
import { Observable, lastValueFrom } from 'rxjs';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler
  implements IQueryHandler<GetUsersQuery, Array<User>>
{
  constructor(private readonly userRepository: UserRepository) {}
  execute(): Promise<Array<User>> {
    const users$: Observable<Array<User>> = this.userRepository.find({});
    return lastValueFrom(users$);
  }
}
