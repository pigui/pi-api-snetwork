import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Comment } from './entities/comment';
import { CreateCommentCommand } from './commands/create-comment.command';
import { User } from '@app/shared/entities';
import { GetCommentsQuery } from './queries/get-comments.query';
import { GetCommentByIdQuery } from './queries/get-comment-by-id.query';
import { GetCommentByUserQuery } from './queries/get-comment-by-user.query';
import { GetCommentByPostIdQuery } from './queries/get-comment-by-post-id.query';

@Injectable()
export class CommentsService {
  private readonly logger = new Logger(CommentsService.name);
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  create(content: string, postId: string, user: User): Promise<Comment> {
    this.logger.log('create');
    return this.commandBus.execute<CreateCommentCommand, Comment>(
      new CreateCommentCommand(content, postId, user)
    );
  }

  find(): Promise<Array<Comment>> {
    this.logger.log('find');
    return this.queryBus.execute<GetCommentsQuery, Array<Comment>>(
      new GetCommentsQuery()
    );
  }

  findById(id: string): Promise<Comment> {
    this.logger.log('findById', id);
    return this.queryBus.execute<GetCommentByIdQuery, Comment>(
      new GetCommentByIdQuery(id)
    );
  }

  findByUser(user: User): Promise<Comment> {
    this.logger.log('findByUser', user);
    return this.queryBus.execute<GetCommentByUserQuery, Comment>(
      new GetCommentByUserQuery(user)
    );
  }

  findByPostId(postId: string): Promise<Comment> {
    this.logger.log('findByPostId', postId);
    return this.queryBus.execute<GetCommentByPostIdQuery, Comment>(
      new GetCommentByPostIdQuery(postId)
    );
  }
}
