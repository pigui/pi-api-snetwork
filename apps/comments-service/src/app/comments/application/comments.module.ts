import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsInfraestructureModule } from '../infraestructure/comments-infraestructure.module';
import { DateModule } from '@app/shared/util/date';
import { GenerateIdModule } from '@app/shared/util/generate-id';
import { CreateCommentCommandHandler } from './commands/create-comment.command-handler';
import { ClientProxy } from '@nestjs/microservices';
import { CommentCreatedEventHandler } from './events/comment-created.event-handler';
import { CommentSaga } from './sagas/comment.saga';
import { CommentFactory } from './factories/comment.factory';
import { GetCommentsQueryHandler } from './queries/get-comments.query-handler';
import { GetCommentByIdQueryHandler } from './queries/get-comment-by-id.query-handler';
import { GetCommentByUserQueryHandler } from './queries/get-comment-by-user.query-handler';
import { GetCommentByPostIdQueryHandler } from './queries/get-comment-by-post-id.query-handler';
import { CommentsController } from '../presentations/comments.controller';
import { InboxModule } from '@app/shared/common/inbox';
import { NatsClientsModule } from '../../nats-clients/application/nats-clients.module';
import { NatsClientsService } from '../../nats-clients/application/nats-clients.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [CommentsController],
  imports: [
    ConfigModule,
    NatsClientsModule,
    InboxModule.forRootAsync({
      useFactory: (natsClients: NatsClientsService) => {
        const clients = new Map<string, ClientProxy>();
        clients.set(natsClients.usersBroker, natsClients.usersClient);
        clients.set(natsClients.postsBroker, natsClients.postsClient);
        return {
          clients,
        };
      },
      inject: [NatsClientsService],
      imports: [NatsClientsModule],
    }),
    CommentsInfraestructureModule,
    DateModule,
    GenerateIdModule,
  ],
  providers: [
    CommentsService,
    CreateCommentCommandHandler,
    CommentCreatedEventHandler,
    CommentSaga,
    CommentFactory,
    GetCommentsQueryHandler,
    GetCommentByIdQueryHandler,
    GetCommentByUserQueryHandler,
    GetCommentByPostIdQueryHandler,
  ],
})
export class CommentsModule {}
