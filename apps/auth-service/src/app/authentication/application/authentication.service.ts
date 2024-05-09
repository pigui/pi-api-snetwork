import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignInWithPasswordCommand } from './commands/sign-in-with-password.command';
import { User } from '@app/shared/entities';
import { RefreshTokenCommand } from './commands/refresh-token.command';
import { VerifyTokenCommand } from './commands/verify-token.command';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(private readonly commandBus: CommandBus) {}

  signInWithPassword(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    this.logger.log('signInWithPassword', email);
    return this.commandBus.execute<
      SignInWithPasswordCommand,
      {
        accessToken: string;
        refreshToken: string;
      }
    >(new SignInWithPasswordCommand(email, password));
  }

  refreshToken(
    user: User,
    token: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    this.logger.log('refreshToken', user);
    return this.commandBus.execute<
      RefreshTokenCommand,
      {
        accessToken: string;
        refreshToken: string;
      }
    >(new RefreshTokenCommand(user, token));
  }

  verify(token: string): Promise<User> {
    return this.commandBus.execute<VerifyTokenCommand, User>(
      new VerifyTokenCommand(token)
    );
  }
}
