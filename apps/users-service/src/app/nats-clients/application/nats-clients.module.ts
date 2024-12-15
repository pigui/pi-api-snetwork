import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  COMMENTS_MESSAGE_BROKER,
  POSTS_MESSAGE_BROKER,
} from './constants/message-broker';
import { NatsClientsService } from './nats-clients.service';

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
              servers: configService?.get('NATS_URL') as string,
              queue: 'comments_service',
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
              servers: configService?.get('NATS_URL') as string,
              queue: 'posts_service',
            },
          };
        },
        imports: [ConfigModule],
        inject: [],
      },
    ]),
  ],
  providers: [NatsClientsService],
  exports: [NatsClientsService, ClientsModule],
})
export class NatsClientsModule {}
