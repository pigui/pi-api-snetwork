import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { lastValueFrom, Observable, tap } from 'rxjs';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user.repository';
import { UserAggregateRoot } from '../root/user.root';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
  implements ICommandHandler<DeleteUserCommand, User>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly publisher: EventPublisher
  ) {}
  execute(command: DeleteUserCommand): Promise<User> {
    const deleteUser$: Observable<User> = this.userRepository
      .delete(command.user)
      .pipe(
        tap((user: User) => {
          const UserModel = this.publisher.mergeClassContext(UserAggregateRoot);
          const model = new UserModel();
          model.delete(user);
          model.commit();
        })
      );
    return lastValueFrom(deleteUser$);
  }
}
