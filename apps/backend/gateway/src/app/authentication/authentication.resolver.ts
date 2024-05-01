import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { SignInWithPasswordInput } from './dto/sign-in-with-password.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';

@Auth(AuthType.None)
@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation('signInWithPassword')
  signInWithPassword(
    @Args('signInWithPasswordInput')
    signInWithPasswordInput: SignInWithPasswordInput
  ) {
    return this.authenticationService.signInWithPassword(
      signInWithPasswordInput.email,
      signInWithPasswordInput.password
    );
  }

  @Mutation('refreshToken')
  refreshToken(
    @Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput
  ) {
    return this.authenticationService.refreshToken(
      null,
      refreshTokenInput.token
    );
  }
}
