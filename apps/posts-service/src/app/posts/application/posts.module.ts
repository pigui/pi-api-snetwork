import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsInfraestructureModule } from '../infraestructure/posts-infraestructure.module';
import { PostFactory } from './factories/post.factory';
import { DateModule } from '@app/shared/util/date';
import { GenerateIdModule } from '@app/shared/util/generate-id';
import { CreatePostCommandHandler } from './commands/create-post.command-handler';
import { GetPostsQueryHandler } from './queries/get-posts.query-handler';
import { GetPostByIdQueryHandler } from './queries/get-post-by-id.query-handler';
import { GetPostByUserQueryHandler } from './queries/get-post-by-user.query-handler';
import { PostsController } from '../presentations/posts.controller';
import { PostCreatedEventHandler } from './events/post-created.event-handler';
import { PostSaga } from './sagas/post.saga';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';

import { InboxModule } from '@app/shared/common/inbox';
import { NatsClientsService } from '../../nats-clients/application/nats-clients.service';
import { NatsClientsModule } from '../../nats-clients/application/nats-clients.module';

@Module({
  controllers: [PostsController],
  imports: [
    PostsInfraestructureModule,
    DateModule,
    GenerateIdModule,
    ConfigModule,
    InboxModule.forRootAsync({
      useFactory: (natsClients: NatsClientsService) => {
        const clients = new Map<string, ClientProxy>();
        clients.set(natsClients.usersBroker, natsClients.usersClient);
        return {
          clients,
        };
      },
      inject: [NatsClientsService],
      imports: [NatsClientsModule],
    }),
  ],
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
