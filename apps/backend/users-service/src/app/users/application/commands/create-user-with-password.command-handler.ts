import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserWithPasswordCommand } from './create-user-with-password.command';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user.repository';
import { UserFactory } from '../factories/user.factory';
import {
  Observable,
  iif,
  lastValueFrom,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { ConflictException, ServiceUnavailableException } from '@nestjs/common';
import { UserAggregateRoot } from '../root/user.root';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(CreateUserWithPasswordCommand)
export class CreateUserWithPasswordCommandHandler
  implements ICommandHandler<CreateUserWithPasswordCommand, User>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
    private readonly publisher: EventPublisher
  ) {}
  async execute(command: CreateUserWithPasswordCommand): Promise<User> {
    const newUser$: Observable<User> = this.userRepository
      .findByEmail(command.email)
      .pipe(
        switchMap((findUser) => {
          if (findUser) {
            return throwError(() => new RpcException(new ConflictException()));
          }
          const user = this.userFactory.create(
            command.email,
            command.firstName,
            command.lastName
          );
          return this.userRepository.create(user).pipe(
            switchMap((userCreated: User) => {
              return iif(
                () => !!userCreated,
                this.userRepository
                  .addPassword(userCreated, command.password)
                  .pipe(
                    switchMap((userPassword: User) => {
                      const UserModel =
                        this.publisher.mergeClassContext(UserAggregateRoot);
                      const model = new UserModel();
                      model.create(userCreated);
                      model.commit();
                      return iif(
                        () => !!userPassword,
                        of(userPassword),
                        throwError(
                          () =>
                            new RpcException(new ServiceUnavailableException())
                        )
                      );
                    })
                  ),
                throwError(
                  () => new RpcException(new ServiceUnavailableException())
                )
              );
            })
          );
        })
      );

    return await lastValueFrom(newUser$);
  }
}
