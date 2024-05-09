import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Post } from '../entities/post';
import { PostRepository } from '../repositories/post.repository';
import { GetPostByUserQuery } from './get-post-by-user.query';
import { Observable, lastValueFrom } from 'rxjs';

@QueryHandler(GetPostByUserQuery)
export class GetPostByUserQueryHandler
  implements IQueryHandler<GetPostByUserQuery, Array<Post>>
{
  constructor(private readonly postRepository: PostRepository) {}
  execute({ user }: GetPostByUserQuery): Promise<Array<Post>> {
    const post$: Observable<Array<Post>> = this.postRepository.findByUserId(
      user.id
    );
    return lastValueFrom(post$);
  }
}
