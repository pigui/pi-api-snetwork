import { ICommand } from '@nestjs/cqrs';

export class VerifyTokenCommand implements ICommand {
  constructor(public readonly accessToken: string) {}
}
