import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user.repository';
import { Observable, lastValueFrom } from 'rxjs';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery, User>
{
  constructor(private readonly userRepository: UserRepository) {}
  execute(query: GetUserByIdQuery): Promise<User> {
    const user$: Observable<User> = this.userRepository.findById(query.id);
    return lastValueFrom(user$);
  }
}
