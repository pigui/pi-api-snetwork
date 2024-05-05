import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Post } from '../entities/post';
import { CreatePostCommand } from './create-post.command';
import { PostRepository } from '../repositories/post.repository';
import { PostFactory } from '../factories/post.factory';
import { Observable, lastValueFrom, map } from 'rxjs';
import { PostAggregateRoot } from '../root/post.root';

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler
  implements ICommandHandler<CreatePostCommand, Post>
{
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postFactory: PostFactory,
    private readonly publisher: EventPublisher
  ) {}
  execute(command: CreatePostCommand): Promise<Post> {
    const createPost = this.postFactory.create(
      command.title,
      command.description,
      command.user.id
    );
    const post$: Observable<Post> = this.postRepository.create(createPost).pipe(
      map((postCreated: Post) => {
        const PostModel = this.publisher.mergeClassContext(PostAggregateRoot);
        const model = new PostModel();
        model.create(postCreated);
        model.commit();
        return postCreated;
      })
    );
    return lastValueFrom(post$);
  }
}
