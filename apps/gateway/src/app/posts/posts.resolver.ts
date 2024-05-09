import { RedisPubSub } from '@app/shared/common/pub';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { FindPostByIdInput } from './dto/find-user-by-id.input';
import { ActiveUser } from '../authentication/decorators/active-user.decortator';
import { User } from '@app/shared/entities';
import { CreatePostInput } from './dto/create-post.input';

@Resolver()
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly redisPubSub: RedisPubSub
  ) {}

  @Query('findPosts')
  findPosts() {
    return this.postsService.find();
  }

  @Query('findPostById')
  findPostById(@Args('findPostByIdInput') { id }: FindPostByIdInput) {
    return this.postsService.findById(id);
  }

  @Query('findMePosts')
  findMePosts(@ActiveUser() user: User) {
    return this.postsService.findByUser(user);
  }

  @Mutation('createPost')
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @ActiveUser() user: User
  ) {
    return this.postsService.create(
      createPostInput.title,
      createPostInput.description,
      user
    );
  }

  @Subscription('postCreated')
  postCreated() {
    return this.redisPubSub.asyncIterator('postCreated');
  }
}
