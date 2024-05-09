import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  POSTS_MESSAGE_BROKER,
  USERS_MESSAGE_BROKER,
} from './constants/message-broker';
import { PostUserResolver } from './post-user.resolver';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
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
  providers: [PostsService, PostsResolver, PostUserResolver],
})
export class PostsModule {}
