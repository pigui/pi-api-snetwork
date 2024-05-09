import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  Observable,
  catchError,
  concatMap,
  iif,
  lastValueFrom,
  map,
  of,
  throwError,
} from 'rxjs';
import { AUTH_MESSAGE_BROKER } from '../constants/message-broker';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { AuthMessage } from '@app/shared/common/messages';
import { User } from '@app/shared/entities';
import { REQUEST_USER_KEY } from '../constants/user-request';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(@Inject(AUTH_MESSAGE_BROKER) private client: ClientProxy) {}
  canActivate(context: ExecutionContext): Promise<boolean> {
    const grapqlContext: GqlExecutionContext =
      GqlExecutionContext.create(context);
    const request = grapqlContext.getContext().req;
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const verify$: Observable<boolean> = this.client
      .send<User, { token: string }>(AuthMessage.VERIFY_TOKEN, { token })
      .pipe(
        concatMap((user) => {
          request[REQUEST_USER_KEY] = user;
          return iif(
            () => !!user,
            of(user).pipe(map(() => true)),
            throwError(() => new UnauthorizedException()).pipe(map(() => false))
          );
        }),
        catchError(() =>
          throwError(() => new UnauthorizedException()).pipe(map(() => false))
        )
      );

    return lastValueFrom(verify$);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
