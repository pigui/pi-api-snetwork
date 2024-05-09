import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Comment } from '../entities/comment';
import { CommentRepository } from '../repositories/comment.repository';
import { GetCommentByPostIdQuery } from './get-comment-by-post-id.query';
import { Observable, lastValueFrom } from 'rxjs';

@QueryHandler(GetCommentByPostIdQuery)
export class GetCommentByPostIdQueryHandler
  implements IQueryHandler<GetCommentByPostIdQuery, Array<Comment>>
{
  constructor(private readonly commentRepository: CommentRepository) {}

  execute({ postId }: GetCommentByPostIdQuery): Promise<Array<Comment>> {
    const comments$: Observable<Array<Comment>> =
      this.commentRepository.findByPost(postId);
    return lastValueFrom(comments$);
  }
}
