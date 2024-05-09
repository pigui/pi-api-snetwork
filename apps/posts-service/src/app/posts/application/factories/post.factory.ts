import { Injectable, Logger } from '@nestjs/common';
import { Post } from '../entities/post';
import { GenerateIdService } from '@app/shared/util/generate-id';
import { DateService } from '@app/shared/util/date';

@Injectable()
export class PostFactory {
  private readonly logger = new Logger(PostFactory.name);
  constructor(
    private readonly generateIdService: GenerateIdService,
    private readonly dateService: DateService
  ) {}
  create(title: string, description: string, userId: string): Post {
    const postId = this.generateIdService.generate();
    const now = this.dateService.now();
    const post = new Post(postId, title, description, userId, now, now);
    this.logger.log('create', post);
    return post;
  }
}
