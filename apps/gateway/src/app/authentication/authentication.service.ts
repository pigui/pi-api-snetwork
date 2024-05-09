import { Inject, Injectable } from '@nestjs/common';
import { AUTH_MESSAGE_BROKER } from './constants/message-broker';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthMessage } from '@app/shared/common/messages';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '@app/shared/entities';

@Injectable()
export class AuthenticationService {
  constructor(@Inject(AUTH_MESSAGE_BROKER) private client: ClientProxy) {}

  signInWithPassword(
    email: string,
    password: string
  ): Observable<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }> {
    return this.client
      .send<
        { accessToken: string; refreshToken: string; user: User },
        { email: string; password: string }
      >(AuthMessage.SIGN_IN_WITH_PASSWORD, { email, password })
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }

  refreshToken(
    user: User,
    token: string
  ): Observable<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }> {
    return this.client
      .send<
        { accessToken: string; refreshToken: string; user: User },
        { user: User; token: string }
      >(AuthMessage.REFRESH_TOKEN, { user, token })
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }
}
