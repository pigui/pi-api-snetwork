import { Module } from '@nestjs/common';

import configurations from './configs/configurations';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { PubModule } from '@app/shared/common/pub';
import { PostsModule } from './posts/application/posts.module';

@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot({ load: [configurations] }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const uri = `${configService.get('DATABASE_URL')}:${configService.get(
          'DATABASE_PORT'
        )}/users`;
        return {
          uri,
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    PubModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          redisHost: configService.get('REDIS_URL'),
          redisPort: parseInt(configService.get('REDIS_PORT'), 10),
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    PostsModule,
  ],
})
export class AppModule {}
