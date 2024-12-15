import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { lastValueFrom, Observable, tap } from 'rxjs';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user.repository';
import { UserAggregateRoot } from '../root/user.root';
import { SoftdeleteUserCommand } from './softdelete-user.command';

@CommandHandler(SoftdeleteUserCommand)
export class SoftdeleteUserCommandHandler
  implements ICommandHandler<SoftdeleteUserCommand, User>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly publisher: EventPublisher
  ) {}
  execute(command: SoftdeleteUserCommand): Promise<User> {
    const softdeleteUser$: Observable<User> = this.userRepository
      .softdelete(command.user)
      .pipe(
        tap((user: User) => {
          const UserModel = this.publisher.mergeClassContext(UserAggregateRoot);
          const model = new UserModel();
          model.softdelete(user);
          model.commit();
        })
      );
    return lastValueFrom(softdeleteUser$);
  }
}
