import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { SignInWithPasswordInput } from './dto/sign-in-with-password.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from './decorators/active-user.decortator';
import { User } from '@app/shared/entities';

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
    @Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput,
    @ActiveUser() user: User
  ) {
    return this.authenticationService.refreshToken(
      user,
      refreshTokenInput.token
    );
  }

  @Auth(AuthType.Bearer)
  @Query('activeUser')
  activeUser(@ActiveUser() user: User) {
    return user;
  }
}
