import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Comment } from '../entities/comment';
import { GetCommentsQuery } from './get-comments.query';
import { CommentRepository } from '../repositories/comment.repository';
import { Observable, lastValueFrom } from 'rxjs';

@QueryHandler(GetCommentsQuery)
export class GetCommentsQueryHandler
  implements IQueryHandler<GetCommentsQuery, Array<Comment>>
{
  constructor(private readonly commentRepository: CommentRepository) {}
  execute(): Promise<Array<Comment>> {
    const comments$: Observable<Array<Comment>> = this.commentRepository.find(
      {}
    );
    return lastValueFrom(comments$);
  }
}
