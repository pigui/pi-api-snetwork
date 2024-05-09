import { IQuery } from '@nestjs/cqrs';

export class GetCommentByPostIdQuery implements IQuery {
  constructor(public readonly postId: string) {}
}
