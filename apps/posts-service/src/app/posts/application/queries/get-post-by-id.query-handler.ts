import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostByIdQuery } from './get-post-by-id.query';
import { Post } from '../entities/post';
import { PostRepository } from '../repositories/post.repository';
import { Observable, lastValueFrom } from 'rxjs';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdQueryHandler
  implements IQueryHandler<GetPostByIdQuery, Post | null>
{
  constructor(private readonly postRepository: PostRepository) {}
  execute(query: GetPostByIdQuery): Promise<Post | null> {
    const post$: Observable<Post> = this.postRepository.findById(query.id);
    return lastValueFrom(post$);
  }
}
