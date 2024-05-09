import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
