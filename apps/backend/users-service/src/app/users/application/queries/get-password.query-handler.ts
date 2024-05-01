import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPasswordQuery } from './get-password.query';
import { UserRepository } from '../repositories/user.repository';
import { Observable, lastValueFrom } from 'rxjs';

@QueryHandler(GetPasswordQuery)
export class GetPasswordQueryHandler
  implements IQueryHandler<GetPasswordQuery, string>
{
  constructor(private readonly userRepository: UserRepository) {}
  execute(query: GetPasswordQuery): Promise<string> {
    const password$: Observable<string> = this.userRepository.getPassword(
      query.user
    );
    return lastValueFrom(password$);
  }
}
