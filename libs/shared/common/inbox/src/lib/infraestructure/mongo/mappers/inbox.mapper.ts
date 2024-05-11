import { Injectable, Logger } from '@nestjs/common';
import { InboxEntity } from '../entities/inbox.entity';
import { Inbox } from '../../../application/entities/inbox';
import { InboxStatus } from '../../../application/entities/inbox-status';
import { ObjectId } from 'mongodb';

@Injectable()
export class InboxMapper {
  private readonly logger = new Logger(InboxMapper.name);
  toDomain(entity: InboxEntity): Inbox {
    this.logger.log('toDomain', entity);
    return new Inbox(
      entity._id.toString(),
      entity.type,
      entity.target,
      new InboxStatus(entity.status as 'pending' | 'processed'),
      entity.payload,
      entity.createdAt
    );
  }

  toPersistence(domain: Inbox): InboxEntity {
    this.logger.log('toPersistence', domain);
    const entity = new InboxEntity();
    entity._id = new ObjectId(domain.id);
    entity.type = domain.type;
    entity.target = domain.target;
    entity.status = domain.status.value;
    entity.payload = domain.payload;
    entity.createdAt = domain.createdAt;
    return entity;
  }
}
