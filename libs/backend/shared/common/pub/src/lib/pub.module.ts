import { DynamicModule, Global, Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './pub.module-definition';
import { PubConfig } from './pub.config';

@Global()
@Module({
  providers: [
    PubConfig,
    {
      provide: RedisPubSub,
      useFactory: (pubConfig: PubConfig) => {
        const options = pubConfig.options;
        const pubsub = new RedisPubSub({
          publisher: new Redis({
            host: options.redisHost,
            port: options.redisPort,
          }),
          subscriber: new Redis({
            host: options.redisHost,
            port: options.redisPort,
          }),
        });
        return pubsub;
      },
      inject: [PubConfig],
    },
  ],
  exports: [RedisPubSub],
})
export class PubModule extends ConfigurableModuleClass {
  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    return super.forRoot(options);
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return super.forRootAsync(options);
  }
}
