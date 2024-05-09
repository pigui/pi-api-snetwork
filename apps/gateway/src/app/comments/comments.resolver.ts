import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { FindCommentByIdInput } from './dto/create-comment-by-id.input';
import { FindCommentByPostIdInput } from './dto/find-comment-by-post-id.input';
import { User } from '@app/shared/entities';
import { ActiveUser } from '../authentication/decorators/active-user.decortator';
import { CreateCommentInput } from './dto/create-comment.input';

@Resolver()
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly redisPubSub: RedisPubSub
  ) {}

  @Query('findComments')
  findComments() {
    return this.commentsService.find();
  }

  @Query('findCommentById')
  findCommentById(@Args('findCommentByIdInput') { id }: FindCommentByIdInput) {
    return this.commentsService.findById(id);
  }

  @Query('findCommentByPostId')
  findCommentByPostId(
    @Args('findCommentByPostIdInput') { postId }: FindCommentByPostIdInput
  ) {
    return this.commentsService.findByPostId(postId);
  }

  @Query('findMeComments')
  findMeComments(@ActiveUser() user: User) {
    return this.commentsService.findByUser(user);
  }

  @Mutation('createComment')
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput
  ) {
    return this.commentsService.create(
      createCommentInput.content,
      createCommentInput.postId
    );
  }

  @Subscription('commentCreated')
  commentCreated() {
    return this.redisPubSub.asyncIterator('commentCreated');
  }
}
