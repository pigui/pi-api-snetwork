import { Injectable, Logger } from '@nestjs/common';
import { PostEntity } from '../entities/post.entity';
import { Post } from '../../../application/entities/post';
import { ObjectId } from 'mongodb';

@Injectable()
export class PostMapper {
  private readonly logger = new Logger(PostMapper.name);
  toDomain(entity: PostEntity): Post {
    this.logger.log('toDomain', entity);
    return new Post(
      entity._id.toString(),
      entity.title,
      entity.description,
      entity.userId.toString(),
      entity.createdAt,
      entity.updatedAt
    );
  }

  toPersistence(domain: Post): PostEntity {
    this.logger.log('toPersistence', domain);
    const entity = new PostEntity();
    entity._id = new ObjectId(domain.id);
    entity.title = domain.title;
    entity.description = domain.description;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.userId = new ObjectId(domain.userId);
    return entity;
  }
}
