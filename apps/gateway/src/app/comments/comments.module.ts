import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  COMMENTS_MESSAGE_BROKER,
  USERS_MESSAGE_BROKER,
} from '../constants/message-broker';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { CommentUserResolver } from './comment-user.resolver';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: COMMENTS_MESSAGE_BROKER,
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.NATS,
            options: {
              servers: configService.get('NATS_URL') as string,
              queue: 'comments_service',
            },
          };
        },
        imports: [ConfigModule],
        inject: [ConfigService],
      },
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
    ]),
  ],
  providers: [CommentsService, CommentsResolver, CommentUserResolver],
})
export class CommentsModule {}
