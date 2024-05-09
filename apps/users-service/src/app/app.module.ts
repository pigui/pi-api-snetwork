import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/application/users.module';
import configurations from './configs/configurations';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersInfraestructureModule } from './users/infraestructure/users-infraestructure.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PubModule } from '@app/shared/common/pub';

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
    UsersModule,
    UsersInfraestructureModule,
  ],
})
export class AppModule {}
