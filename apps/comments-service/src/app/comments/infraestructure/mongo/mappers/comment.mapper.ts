import { Injectable, Logger } from '@nestjs/common';
import { CommentEntity } from '../entities/comment.entity';
import { Comment } from '../../../application/entities/comment';
import { ObjectId } from 'mongodb';

@Injectable()
export class CommentMapper {
  private readonly logger = new Logger(CommentMapper.name);
  toDomain(entity: CommentEntity): Comment {
    this.logger.log('toDomain', entity);
    return new Comment(
      entity._id.toString(),
      entity.content,
      entity.userId.toString(),
      entity.postId.toString(),
      entity.createdAt,
      entity.updatedAt
    );
  }

  toPersistence(domain: Comment): CommentEntity {
    this.logger.log('toPersistence', domain);
    const entity = new CommentEntity();
    entity._id = new ObjectId(domain.id);
    entity.content = domain.content;
    entity.postId = new ObjectId(domain.postId);
    entity.userId = new ObjectId(domain.userId);
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;

    return entity;
  }
}
