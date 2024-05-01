import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from './refresh-token.command';
import { AuthenticationRepository } from '../repositories/authentication.repository';
import { Inject } from '@nestjs/common';
import { USERS_MESSAGE_BROKER } from '../constants/message-broker';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, lastValueFrom, map } from 'rxjs';
import { User } from '@app/shared/entities';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler
  implements
    ICommandHandler<
      RefreshTokenCommand,
      { accessToken: string; refreshToken: string; user: User }
    >
{
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
    @Inject(USERS_MESSAGE_BROKER) private client: ClientProxy
  ) {}
  execute(
    command: RefreshTokenCommand
  ): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    const sign$: Observable<{
      accessToken: string;
      refreshToken: string;
      user: User;
    }> = this.authenticationRepository
      .refreshToken(command.token, command.user)
      .pipe(
        map(({ accessToken, refreshToken }) => {
          return { accessToken, refreshToken, user: command.user };
        })
      );
    return lastValueFrom(sign$);
  }
}
