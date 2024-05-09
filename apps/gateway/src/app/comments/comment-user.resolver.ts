import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from '@app/shared/entities';

@Resolver('Comment')
export class CommentUserResolver {
  constructor(private readonly commentsService: CommentsService) {}
  @ResolveField('user')
  getUserOfComment(@Parent() comment: Comment) {
    return this.commentsService.findById(comment.userId);
  }
}
