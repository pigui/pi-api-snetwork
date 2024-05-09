import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: Redis,
      useFactory: (configService: ConfigService) => {
        return new Redis({
          host: configService.get('REDIS_URL'),
          port: parseInt(configService.get('REDIS_PORT'), 10),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [Redis],
})
export class RedisModule {}
