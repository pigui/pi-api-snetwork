import { Inject, Injectable } from '@nestjs/common';
import {
  COMMENTS_MESSAGE_BROKER,
  USERS_MESSAGE_BROKER,
} from '../constants/message-broker';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import * as Entites from '@app/shared/entities';
import { Observable, catchError, throwError } from 'rxjs';
import { CommentMessage, UserMessages } from '@app/shared/common/messages';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(COMMENTS_MESSAGE_BROKER)
    private readonly commentsClient: ClientProxy,
    @Inject(USERS_MESSAGE_BROKER) private readonly usersClient: ClientProxy
  ) {}

  create(content: string, postId: string): Observable<Entites.Comment> {
    return this.commentsClient
      .send<Entites.Comment>(CommentMessage.CREATE, { content, postId })
      .pipe(catchError((err) => throwError(() => new RpcException(err))));
  }

  find(): Observable<Array<Entites.Comment>> {
    return this.commentsClient
      .send<Array<Entites.Comment>>(CommentMessage.FIND, {})
      .pipe(catchError((err) => throwError(() => new RpcException(err))));
  }

  findById(id: string): Observable<Entites.Comment> {
    return this.commentsClient
      .send<Entites.Comment>(CommentMessage.FIND_BY_ID, { id })
      .pipe(catchError((err) => throwError(() => new RpcException(err))));
  }

  findByUser(user: Entites.User): Observable<Array<Entites.Comment>> {
    return this.commentsClient
      .send<Array<Entites.Comment>>(CommentMessage.FIND_BY_USER, { user })
      .pipe(catchError((err) => throwError(() => new RpcException(err))));
  }

  findByPostId(postId: string): Observable<Array<Entites.Comment>> {
    return this.commentsClient
      .send<Array<Entites.Comment>>(CommentMessage.FIND_BY_POST_ID, { postId })
      .pipe(catchError((err) => throwError(() => new RpcException(err))));
  }

  findUserById(id: string): Observable<Entites.User> {
    return this.usersClient
      .send<Entites.User>(UserMessages.FIND_BY_ID, { id })
      .pipe(catchError((err) => throwError(() => new RpcException(err))));
  }
}
