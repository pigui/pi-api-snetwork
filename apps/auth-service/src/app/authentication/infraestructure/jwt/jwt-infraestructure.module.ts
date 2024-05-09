import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationRepository } from '../../application/repositories/authentication.repository';
import { AuthenticationRepositoryImpl } from './repositories/authentication.repository';
import { RefreshTokenStorageModule } from './refresh-token-storage/refresh-token-storage.module';
import jwtConfig from './config/jwt.config';
import { GenerateIdModule } from '@app/backend/shared/util/generate-id';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    RefreshTokenStorageModule,
    GenerateIdModule,
  ],
  providers: [
    {
      provide: AuthenticationRepository,
      useClass: AuthenticationRepositoryImpl,
    },
  ],
  exports: [AuthenticationRepository],
})
export class JwtInfraestructureModule {}
