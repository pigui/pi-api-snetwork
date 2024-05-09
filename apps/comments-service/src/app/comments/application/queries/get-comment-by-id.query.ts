import { IQuery } from '@nestjs/cqrs';

export class GetCommentByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
