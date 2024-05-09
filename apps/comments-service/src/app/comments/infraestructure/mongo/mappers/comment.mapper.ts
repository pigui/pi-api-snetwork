import { Injectable, Logger } from '@nestjs/common';
import { CommentEntity } from '../entities/comment.entity';
import { Comment } from '../../../application/entities/comment';

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
    return entity;
  }
}
