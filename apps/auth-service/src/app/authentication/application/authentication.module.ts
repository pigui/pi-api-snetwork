import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationInfraestructureModule } from '../infraestructure/authentication-infraestructure.module';
import { SignInWithPasswordCommandHandler } from './commands/sign-in-with-password.command-handler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_MESSAGE_BROKER } from './constants/message-broker';
import { RefreshTokenCommandHandler } from './commands/refresh-token.command-handler';
import { AuthenticationController } from '../presentations/authentication.controller';
import { VerifyTokenCommandHandler } from './commands/verify-token.command-handler';

@Module({
  controllers: [AuthenticationController],
  imports: [
    AuthenticationInfraestructureModule,
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
    ]),
  ],
  providers: [
    AuthenticationService,
    SignInWithPasswordCommandHandler,
    RefreshTokenCommandHandler,
    VerifyTokenCommandHandler,
  ],
})
export class AuthenticationModule {}
