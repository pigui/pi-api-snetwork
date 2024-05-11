import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InboxEntity, InboxSchema } from './entities/inbox.entity';
import { InboxRepository } from '../../application/repositories/inbox.repository';
import { InboxRepositoryImpl } from './repositories/inbox.repository';
import { InboxMapper } from './mappers/inbox.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InboxEntity.name, schema: InboxSchema },
    ]),
  ],
  providers: [
    { provide: InboxRepository, useClass: InboxRepositoryImpl },
    InboxMapper,
  ],
  exports: [InboxRepository],
})
export class MongoInfraestructureModule {}
