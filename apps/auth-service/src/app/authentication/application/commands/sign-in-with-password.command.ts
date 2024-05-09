import { ICommand } from '@nestjs/cqrs';

export class SignInWithPasswordCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}
