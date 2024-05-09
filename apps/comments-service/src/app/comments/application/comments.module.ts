import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsInfraestructureModule } from '../infraestructure/comments-infraestructure.module';
import { DateModule } from '@app/shared/util/date';
import { GenerateIdModule } from '@app/shared/util/generate-id';
import { CreateCommentCommandHandler } from './commands/create-comment.command-handler';
import {
  POSTS_MESSAGE_BROKER,
  USERS_MESSAGE_BROKER,
} from './constants/message-broker';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommentCreatedEventHandler } from './events/comment-created.event-handler';
import { CommentSaga } from './sagas/comment.saga';
import { CommentFactory } from './factories/comment.factory';

@Module({
  imports: [
    CommentsInfraestructureModule,
    DateModule,
    GenerateIdModule,
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: USERS_MESSAGE_BROKER,
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.NATS,
            options: {
              servers: configService.get('NATS_URL') as string,
              queue: 'users_service',
            },
          };
        },
        imports: [ConfigModule],
        inject: [ConfigService],
      },
      {
        name: POSTS_MESSAGE_BROKER,
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.NATS,
            options: {
              servers: configService.get('NATS_URL') as string,
              queue: 'posts_service',
            },
          };
        },
        imports: [ConfigModule],
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [
    CommentsService,
    CreateCommentCommandHandler,
    CommentCreatedEventHandler,
    CommentSaga,
    CommentFactory,
  ],
})
export class CommentsModule {}
