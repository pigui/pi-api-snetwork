import { Controller } from '@nestjs/common';
import { AuthenticationService } from '../application/authentication.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthMessage } from '@app/backend/shared/common/messages';
import { SignInWithPasswordDto } from './dto/sign-in-with-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @MessagePattern(AuthMessage.SIGN_IN_WITH_PASSWORD)
  signInWithPassword(@Payload() signInWithPasswordDto: SignInWithPasswordDto) {
    return this.authenticationService.signInWithPassword(
      signInWithPasswordDto.email,
      signInWithPasswordDto.password
    );
  }

  @MessagePattern(AuthMessage.REFRESH_TOKEN)
  refreshToken(@Payload() refreshTokenDto: RefreshTokenDto) {
    return this.authenticationService.refreshToken(
      refreshTokenDto.user,
      refreshTokenDto.token
    );
  }

  @MessagePattern(AuthMessage.VERIFY_TOKEN)
  verify(@Payload() verifyTokenDto: VerifyTokenDto) {
    return this.authenticationService.verify(verifyTokenDto.token);
  }
}
