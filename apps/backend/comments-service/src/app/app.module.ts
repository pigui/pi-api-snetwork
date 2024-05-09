import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { CommentsModule } from './comments/application/comments.module';
import configurations from './configs/configurations';
import { PubModule } from '@app/backend/shared/common/pub';
import { MongooseModule } from '@nestjs/mongoose';

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
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
