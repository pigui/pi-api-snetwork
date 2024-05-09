import { Inject, Injectable } from '@nestjs/common';
import { USERS_MESSAGE_BROKER } from './constants/message-broker';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import type * as Entites from '@app/shared/entities';
import { UserMessages } from '@app/shared/common/messages';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_MESSAGE_BROKER) private readonly usersClient: ClientProxy
  ) {}

  createWithPassword(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Observable<Entites.User> {
    return this.usersClient
      .send<Entites.User, { email; firstName; lastName; password }>(
        UserMessages.CREATE_USER_WITH_PASSWORD,
        {
          email,
          firstName,
          lastName,
          password,
        }
      )
      .pipe(catchError((err) => throwError(() => new RpcException(err))));
  }

  find(): Observable<Entites.User> {
    return this.usersClient
      .send<Entites.User>(UserMessages.FIND, {})
      .pipe(catchError((err) => throwError(() => new RpcException(err))));
  }

  findByEmail(email: string): Observable<Entites.User> {
    return this.usersClient
      .send<Entites.User>(UserMessages.FIND_BY_EMAIL, { email })
      .pipe(catchError((err) => throwError(() => new RpcException(err))));
  }

  findById(id: string): Observable<Entites.User> {
    return this.usersClient
      .send<Entites.User>(UserMessages.FIND_BY_ID, { id })
      .pipe(catchError((err) => throwError(() => new RpcException(err))));
  }
}
