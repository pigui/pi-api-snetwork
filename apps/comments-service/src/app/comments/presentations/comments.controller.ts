import { CommentMessage } from '@app/shared/common/messages';
import { Controller } from '@nestjs/common';
import { CommentsService } from '../application/comments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FindCommentById } from './dto/find-by-id.dto';
import { FindCommentsByUser } from './dto/find-by-user.dto';
import { FindCommentByPostId } from './dto/find-by-post-id.dto';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @MessagePattern(CommentMessage.CREATE)
  create(@Payload() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(
      createCommentDto.content,
      createCommentDto.postId,
      createCommentDto.user
    );
  }

  @MessagePattern(CommentMessage.FIND)
  find() {
    return this.commentsService.find();
  }

  @MessagePattern(CommentMessage.FIND_BY_ID)
  findById(@Payload() { id }: FindCommentById) {
    return this.commentsService.findById(id);
  }

  @MessagePattern(CommentMessage.FIND_BY_USER)
  findByUser(@Payload() { user }: FindCommentsByUser) {
    return this.commentsService.findByUser(user);
  }

  @MessagePattern(CommentMessage.FIND_BY_POST_ID)
  findByPostId(@Payload() { postId }: FindCommentByPostId) {
    return this.commentsService.findByPostId(postId);
  }
}
