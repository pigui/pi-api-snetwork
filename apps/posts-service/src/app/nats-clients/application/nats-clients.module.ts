import { Module } from '@nestjs/common';
import { NatsClientsService } from './nats-clients.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_MESSAGE_BROKER } from './constants/message-broker';

@Module({
  imports: [
    ConfigModule,
    NatsClientsModule,
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
    ]),
  ],
  providers: [NatsClientsService],
  exports: [NatsClientsService, ClientsModule],
})
export class NatsClientsModule {}
