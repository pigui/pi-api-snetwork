import { Post } from '@app/shared/entities';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';

@Resolver('Post')
export class PostUserResolver {
  constructor(private readonly postsService: PostsService) {}
  @ResolveField('user')
  getUserOfPost(@Parent() post: Post) {
    return this.postsService.findById(post.userId);
  }
}
