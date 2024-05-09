import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import configurations from './configs/configurations';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthenticationModule } from './authentication/application/authentication.module';

@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot({ load: [configurations] }),
    AuthenticationModule,
  ],
})
export class AppModule {}
