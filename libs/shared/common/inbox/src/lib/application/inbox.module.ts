import { Module } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { CqrsModule } from '@nestjs/cqrs';
import { InboxInfraestructureModule } from '../infraestructure/inbox-infraestructure.module';
import { InboxFactory } from './factories/inbox.factory';
import { DateModule } from '@app/shared/util/date';
import { GenerateIdModule } from '@app/shared/util/generate-id';
import { CreateInboxCommandHandler } from './commands/create-inbox.command-handler';
import { DeleteInboxCommandHandler } from './commands/delete-inbox.command-handler';
import { ProcessInboxMessageQueryHandler } from './queries/process-inbox-message.query-handler';
import { InboxProcessor } from './inbox-processor';
import { BullModule } from '@nestjs/bull';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { RegisterInboxEventHandler } from './events/register-inbox.event-handler';
import { InboxSaga } from './sagas/inbox.saga';
import { InboxConsumer } from './inbox-consumer';

@Module({
  controllers: [],
  providers: [
    InboxService,
    InboxFactory,
    CreateInboxCommandHandler,
    DeleteInboxCommandHandler,
    ProcessInboxMessageQueryHandler,
    InboxProcessor,
    RegisterInboxEventHandler,
    InboxSaga,
    InboxConsumer,
    InboxProcessor,
  ],
  imports: [
    ConfigModule,
    CqrsModule,
    InboxInfraestructureModule,
    DateModule,
    GenerateIdModule,
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const port = parseInt(configService.getOrThrow('REDIS_PORT'), 10);
        const host = configService.getOrThrow<string>('REDIS_URL');
        return {
          redis: {
            host,
            port,
          },
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'proccessInbox',
    }),
  ],
  exports: [],
})
export class InboxModule {}
