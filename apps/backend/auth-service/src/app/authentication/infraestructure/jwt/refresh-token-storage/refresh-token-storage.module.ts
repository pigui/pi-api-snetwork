import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { RefreshTokenStorage } from './refresh-token-storage';

@Module({
  imports: [RedisModule],
  providers: [RefreshTokenStorage],
  exports: [RefreshTokenStorage],
})
export class RefreshTokenStorageModule {}
