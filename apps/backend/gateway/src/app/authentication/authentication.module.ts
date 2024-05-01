import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_MESSAGE_BROKER } from './constants/message-broker';
import { AuthenticationResolver } from './authentication.resolver';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AccessTokenGuard } from './guards/access-token.guard';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_MESSAGE_BROKER,
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.NATS,
            options: {
              servers: configService.get('NATS_URL') as string,
              queue: 'auth_service',
            },
          };
        },
        imports: [ConfigModule],
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [
    AuthenticationService,
    AuthenticationResolver,
    AuthenticationGuard,
    AccessTokenGuard,
    { provide: APP_GUARD, useClass: AuthenticationGuard },
  ],
})
export class AuthenticationModule {}
