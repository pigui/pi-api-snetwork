import { Module } from '@nestjs/common';
import { NatsClientsService } from './nats-clients.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  POSTS_MESSAGE_BROKER,
  USERS_MESSAGE_BROKER,
} from './constants/message-broker';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: USERS_MESSAGE_BROKER,
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.NATS,
            options: {
              servers: configService?.get('NATS_URL') as string,
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
