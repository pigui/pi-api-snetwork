import { Controller } from '@nestjs/common';
import { PostsService } from '../application/posts.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostMessage } from '@app/shared/common/messages';
import { FindPostByIdDto } from './dto/find-by-id.dto';
import { FindByUserDto } from './dto/find-by-user.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @MessagePattern(PostMessage.FIND)
  find() {
    return this.postsService.find();
  }

  @MessagePattern(PostMessage.FIND_BY_ID)
  findById(@Payload() { id }: FindPostByIdDto) {
    return this.postsService.findById(id);
  }

  @MessagePattern(PostMessage.FIND_BY_USER)
  findByUser(@Payload() { user }: FindByUserDto) {
    return this.postsService.findByUser(user);
  }

  @MessagePattern(PostMessage.CREATE)
  create(@Payload() createPostDto: CreatePostDto) {
    return this.postsService.create(
      createPostDto.title,
      createPostDto.description,
      createPostDto.user
    );
  }
}
