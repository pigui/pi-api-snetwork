import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Comment } from '../entities/comment';
import { GetCommentByUserQuery } from './get-comment-by-user.query';
import { CommentRepository } from '../repositories/comment.repository';
import { Observable, lastValueFrom } from 'rxjs';

@QueryHandler(GetCommentByUserQuery)
export class GetCommentByUserQueryHandler
  implements IQueryHandler<GetCommentByUserQuery, Array<Comment>>
{
  constructor(private readonly commentRepository: CommentRepository) {}
  execute({ user }: GetCommentByUserQuery): Promise<Array<Comment>> {
    const comment$: Observable<Array<Comment>> =
      this.commentRepository.findByUserId(user.id);
    return lastValueFrom(comment$);
  }
}
