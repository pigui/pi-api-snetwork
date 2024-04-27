import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserWithPasswordCommand } from './create-user-with-password.command';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user.repository';
import { UserFactory } from '../factories/user.factory';
import {
  Observable,
  lastValueFrom,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { ConflictException, ServiceUnavailableException } from '@nestjs/common';
import { UserAggregateRoot } from '../root/user.root';

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
            return throwError(() => new ConflictException());
          }
          const user = this.userFactory.create(
            command.email,
            command.firstName,
            command.lastName
          );
          return this.userRepository.create(user).pipe(
            switchMap((user) => {
              if (!user) {
                return throwError(() => new ServiceUnavailableException());
              }
              return this.userRepository
                .addPassword(user, command.password)
                .pipe(
                  switchMap((userPassword) => {
                    if (!userPassword) {
                      return throwError(
                        () => new ServiceUnavailableException()
                      );
                    }
                    return of(userPassword).pipe(
                      tap((userCreated: User) => {
                        const UserModel =
                          this.publisher.mergeClassContext(UserAggregateRoot);
                        const model = new UserModel();
                        model.create(userCreated);
                        model.commit();
                      })
                    );
                  })
                );
            })
          );
        })
      );

    return await lastValueFrom(newUser$);
  }
}
