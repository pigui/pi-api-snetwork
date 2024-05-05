import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  POSTS_MESSAGE_BROKER,
  USERS_MESSAGE_BROKER,
} from './constants/message-broker';
import { User } from '@app/shared/entities';
import { Observable, catchError, throwError } from 'rxjs';
import { PostMessage, UserMessages } from '@app/backend/shared/common/messages';
import * as Entites from '@app/shared/entities';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POSTS_MESSAGE_BROKER) private readonly postsClient: ClientProxy,
    @Inject(USERS_MESSAGE_BROKER) private readonly usersClient: ClientProxy
  ) {}

  create(
    title: string,
    description: string,
    user: User
  ): Observable<Entites.Post> {
    return this.postsClient
      .send<Entites.Post, { title: string; description: string; user: User }>(
        PostMessage.CREATE,
        { title, description, user }
      )
      .pipe(catchError((err) => throwError(() => new RpcException(err))));
  }

  find(): Observable<Array<Entites.Post>> {
    return this.postsClient
      .send<Array<Entites.Post>>(PostMessage.FIND, {})
      .pipe(catchError((err) => throwError(() => new RpcException(err))));
  }

  findById(id: string): Observable<Entites.Post> {
    return this.postsClient
      .send<Entites.Post>(PostMessage.FIND_BY_ID, { id })
      .pipe(catchError((err) => throwError(() => new RpcException(err))));
  }

  findByUser(user: Entites.User): Observable<Array<Entites.Post>> {
    return this.postsClient
      .send<Array<Entites.Post>>(PostMessage.FIND_BY_USER, { user })
      .pipe(catchError((err) => throwError(() => new RpcException(err))));
  }

  findUserById(id: string): Observable<Entites.User> {
    return this.usersClient
      .send<Entites.User>(UserMessages.FIND_BY_ID, { id })
      .pipe(catchError((err) => throwError(() => new RpcException(err))));
  }
}
