import { Injectable, Logger } from '@nestjs/common';
import { InboxRepository } from '../../../application/repositories/inbox.repository';
import { Observable, from, map, switchMap, toArray } from 'rxjs';
import { Inbox } from '../../../application/entities/inbox';
import { InboxEntity } from '../entities/inbox.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InboxMapper } from '../mappers/inbox.mapper';

@Injectable()
export class InboxRepositoryImpl implements InboxRepository {
  private readonly logger = new Logger(InboxRepository.name);
  constructor(
    @InjectModel(InboxEntity.name)
    private readonly inboxModel: Model<InboxEntity>,
    private readonly inboxMapper: InboxMapper
  ) {}
  create(inbox: Inbox): Observable<Inbox> {
    this.logger.log('create', inbox);
    const entities = this.inboxMapper.toPersistence(inbox);
    const model = new this.inboxModel(entities);
    return from(model.save()).pipe(
      map((newInbox) => this.inboxMapper.toDomain(newInbox.toJSON()))
    );
  }
  find(): Observable<Array<Inbox>> {
    this.logger.log('find');
    const entities = this.inboxModel
      .find()
      .sort({ createdAt: -1 })
      .lean<Array<InboxEntity>>()
      .exec();

    return from(entities).pipe(
      switchMap((inboxs: Array<InboxEntity>) =>
        from(inboxs).pipe(
          map((inbox) => this.inboxMapper.toDomain(inbox)),
          toArray()
        )
      )
    );
  }

  findStatus(status: 'pending' | 'processed'): Observable<Inbox[]> {
    const entities = this.inboxModel
      .find({ status })
      .sort({ createdAt: -1 })
      .lean<Array<InboxEntity>>()
      .exec();

    return from(entities).pipe(
      switchMap((inboxs: Array<InboxEntity>) =>
        from(inboxs).pipe(
          map((inbox) => this.inboxMapper.toDomain(inbox)),
          toArray()
        )
      )
    );
  }
  delete(inbox: Inbox): Observable<void> {
    this.logger.log('delete', inbox);
    const entity = this.inboxMapper.toPersistence(inbox);

    return from(
      this.inboxModel.deleteOne({ _id: entity._id }).lean<InboxEntity>()
    ).pipe(
      map(() => {
        return;
      })
    );
  }
}
