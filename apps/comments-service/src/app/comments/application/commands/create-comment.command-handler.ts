import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Comment } from '../entities/comment';
import { CreateCommentCommand } from './create-comment.command';
import { CommentFactory } from '../factories/comment.factory';
import { CommentRepository } from '../repositories/comment.repository';
import { NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  Observable,
  forkJoin,
  iif,
  lastValueFrom,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { PostMessage, UserMessages } from '@app/shared/common/messages';
import { Post, User } from '@app/shared/entities';
import { CommentAggregateRoot } from '../root/comment.root';
import { NatsClientsService } from '../../../nats-clients/application/nats-clients.service';

@CommandHandler(CreateCommentCommand)
export class CreateCommentCommandHandler
  implements ICommandHandler<CreateCommentCommand, Comment>
{
  constructor(
    private readonly commentFactory: CommentFactory,
    private readonly commentRepository: CommentRepository,
    private readonly natsClientsService: NatsClientsService,
    private readonly publisher: EventPublisher
  ) {}

  execute(command: CreateCommentCommand): Promise<Comment> {
    const comment$: Observable<Comment> = forkJoin([
      this.natsClientsService.usersClient
        .send<User>(UserMessages.FIND_BY_ID, {
          id: command.user.id,
        })
        .pipe(
          switchMap((user) =>
            iif(
              () => !!user,
              of(user),
              throwError(() => new RpcException(new NotFoundException()))
            )
          )
        ),
      this.natsClientsService.postsClient
        .send<Post>(PostMessage.FIND_BY_ID, {
          id: command.postId,
        })
        .pipe(
          switchMap((post) =>
            iif(
              () => !!post,
              of(post),
              throwError(() => new RpcException(new NotFoundException()))
            )
          )
        ),
    ]).pipe(
      switchMap(([user, post]: [User, Post]) => {
        const newComment = this.commentFactory.create(
          command.content,
          user.id,
          post.id
        );
        return this.commentRepository.create(newComment).pipe(
          map((commentCreated: Comment) => {
            const CommentModel =
              this.publisher.mergeClassContext(CommentAggregateRoot);
            const model = new CommentModel();
            model.create(commentCreated);
            model.commit();
            return commentCreated;
          })
        );
      })
    );

    return lastValueFrom(comment$);
  }
}
