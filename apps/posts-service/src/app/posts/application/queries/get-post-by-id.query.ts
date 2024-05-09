import { IQuery } from '@nestjs/cqrs';

export class GetPostByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
