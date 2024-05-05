import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsInfraestructureModule } from '../infraestructure/posts-infraestructure.module';
import { PostFactory } from './factories/post.factory';
import { DateModule } from '@app/backend/shared/util/date';
import { GenerateIdModule } from '@app/backend/shared/util/generate-id';
import { CreatePostCommandHandler } from './commands/create-post.command-handler';
import { GetPostsQueryHandler } from './queries/get-posts.query-handler';
import { GetPostByIdQueryHandler } from './queries/get-post-by-id.query-handler';
import { GetPostByUserQueryHandler } from './queries/get-post-by-user.query-handler';
import { PostsController } from '../presentations/posts.controller';
import { PostCreatedEventHandler } from './events/post-created.event-handler';
import { PostSaga } from './sagas/post.saga';

@Module({
  controllers: [PostsController],
  imports: [PostsInfraestructureModule, DateModule, GenerateIdModule],
  providers: [
    PostsService,
    PostFactory,
    CreatePostCommandHandler,
    GetPostsQueryHandler,
    GetPostByIdQueryHandler,
    GetPostByUserQueryHandler,
    PostCreatedEventHandler,
    PostSaga,
  ],
})
export class PostsModule {}
