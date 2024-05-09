import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Post } from './entities/post';
import { CreatePostCommand } from './commands/create-post.command';
import { User } from '@app/shared/entities';
import { GetPostByIdQuery } from './queries/get-post-by-id.query';
import { GetPostByUserQuery } from './queries/get-post-by-user.query';
import { GetPostsQuery } from './queries/get-posts.query';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  create(title: string, description: string, user: User): Promise<Post> {
    this.logger.log('create');
    return this.commandBus.execute<CreatePostCommand, Post>(
      new CreatePostCommand(title, description, user)
    );
  }

  find(): Promise<Array<Post>> {
    this.logger.log('find');
    return this.queryBus.execute<GetPostsQuery, Array<Post>>(
      new GetPostsQuery()
    );
  }

  findById(id: string): Promise<Post> {
    this.logger.log('findById', id);
    return this.queryBus.execute<GetPostByIdQuery, Post>(
      new GetPostByIdQuery(id)
    );
  }

  findByUser(user: User): Promise<Post> {
    this.logger.log('findByUser', user);
    return this.queryBus.execute<GetPostByUserQuery, Post>(
      new GetPostByUserQuery(user)
    );
  }
}
