import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Comment } from '../entities/comment';
import { GetCommentByIdQuery } from './get-comment-by-id.query';
import { CommentRepository } from '../repositories/comment.repository';
import { Observable, lastValueFrom } from 'rxjs';

@QueryHandler(GetCommentByIdQuery)
export class GetCommentByIdQueryHandler
  implements IQueryHandler<GetCommentByIdQuery, Comment>
{
  constructor(private readonly commentRepository: CommentRepository) {}
  execute({ id }: GetCommentByIdQuery): Promise<Comment | null> {
    const post$: Observable<Comment> = this.commentRepository.findById(id);
    return lastValueFrom(post$);
  }
}
