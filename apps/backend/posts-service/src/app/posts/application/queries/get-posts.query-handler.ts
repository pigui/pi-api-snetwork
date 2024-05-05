import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostsQuery } from './get-posts.query';
import { Post } from '../entities/post';
import { PostRepository } from '../repositories/post.repository';
import { Observable, lastValueFrom } from 'rxjs';

@QueryHandler(GetPostsQuery)
export class GetPostsQueryHandler
  implements IQueryHandler<GetPostsQuery, Array<Post>>
{
  constructor(private readonly postRepository: PostRepository) {}
  execute(): Promise<Array<Post>> {
    const posts$: Observable<Array<Post>> = this.postRepository.find({});
    return lastValueFrom(posts$);
  }
}
