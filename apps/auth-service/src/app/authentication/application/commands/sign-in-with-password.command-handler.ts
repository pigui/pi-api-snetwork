import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInWithPasswordCommand } from './sign-in-with-password.command';
import { AuthenticationRepository } from '../repositories/authentication.repository';
import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { USERS_MESSAGE_BROKER } from '../constants/message-broker';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { UserMessages } from '@app/shared/common/messages';
import { User } from '@app/shared/entities';
import {
  Observable,
  concatMap,
  iif,
  lastValueFrom,
  map,
  switchMap,
  throwError,
} from 'rxjs';

@CommandHandler(SignInWithPasswordCommand)
export class SignInWithPasswordCommandHandler
  implements
    ICommandHandler<
      SignInWithPasswordCommand,
      { accessToken: string; refreshToken: string; user: User }
    >
{
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
    @Inject(USERS_MESSAGE_BROKER) private client: ClientProxy
  ) {}
  execute(
    command: SignInWithPasswordCommand
  ): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    const sign$: Observable<{
      accessToken: string;
      refreshToken: string;
      user: User;
    }> = this.client
      .send<User>(UserMessages.FIND_BY_EMAIL, {
        email: command.email,
      })
      .pipe(
        switchMap((user) => {
          return iif(
            () => !!user,
            this.client
              .send<boolean, { user: User; password: string }>(
                UserMessages.COMPARE_PASSWORD,
                { user, password: command.password }
              )
              .pipe(
                concatMap((isValid: boolean) => {
                  return iif(
                    () => isValid,
                    this.authenticationRepository.sign(user).pipe(
                      map(({ accessToken, refreshToken }) => {
                        return { user, accessToken, refreshToken };
                      })
                    ),
                    throwError(
                      () => new RpcException(new UnauthorizedException())
                    )
                  );
                })
              ),
            throwError(() => new RpcException(new NotFoundException()))
          );
        })
      );

    return lastValueFrom(sign$);
  }
}
