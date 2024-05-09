import { Module } from '@nestjs/common';
import { JwtInfraestructureModule } from './jwt/jwt-infraestructure.module';

@Module({
  imports: [JwtInfraestructureModule],
  exports: [JwtInfraestructureModule],
})
export class AuthenticationInfraestructureModule {}
