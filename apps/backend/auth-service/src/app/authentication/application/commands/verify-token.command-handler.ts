import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyTokenCommand } from './verify-token.command';
import { AuthenticationRepository } from '../repositories/authentication.repository';
import {
  Observable,
  iif,
  lastValueFrom,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { User } from '@app/shared/entities';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { USERS_MESSAGE_BROKER } from '../constants/message-broker';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { UserMessages } from '@app/backend/shared/common/messages';

@CommandHandler(VerifyTokenCommand)
export class VerifyTokenCommandHandler
  implements ICommandHandler<VerifyTokenCommand, User>
{
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
    @Inject(USERS_MESSAGE_BROKER) private client: ClientProxy
  ) {}
  execute(command: VerifyTokenCommand): Promise<User> {
    const verify$: Observable<User> = this.authenticationRepository
      .verify(command.accessToken)
      .pipe(
        switchMap((userId: string) =>
          iif(
            () => !!userId,
            this.client.send<User>(UserMessages.FIND_BY_ID, { id: userId }),
            throwError(() => new RpcException(new UnauthorizedException()))
          )
        )
      );
    return lastValueFrom(verify$);
  }
}
