import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user.repository';
import { Observable, lastValueFrom } from 'rxjs';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler
  implements IQueryHandler<GetUserByEmailQuery, User>
{
  constructor(private readonly userRepository: UserRepository) {}
  execute(query: GetUserByEmailQuery): Promise<User> {
    const user$: Observable<User> = this.userRepository.findByEmail(
      query.email
    );
    return lastValueFrom(user$);
  }
}
