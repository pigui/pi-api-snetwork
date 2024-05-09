import { DateService } from '@app/shared/util/date';
import { GenerateIdService } from '@app/shared/util/generate-id';
import { Injectable, Logger } from '@nestjs/common';
import { Comment } from '../entities/comment';

@Injectable()
export class CommentFactory {
  private readonly logger = new Logger(CommentFactory.name);
  constructor(
    private readonly generateIdService: GenerateIdService,
    private readonly dateService: DateService
  ) {}

  create(content: string, userId: string, postId: string): Comment {
    const commentId = this.generateIdService.generate();
    const now = this.dateService.now();
    const comment = new Comment(commentId, content, userId, postId, now, now);
    this.logger.log('create', comment);
    return comment;
  }
}
