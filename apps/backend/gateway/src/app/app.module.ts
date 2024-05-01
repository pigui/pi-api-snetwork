import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { PubModule } from '@app/backend/shared/common/pub';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { AuthenticationModule } from './authentication/authentication.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'apps/backend/gateway/src/graphql.ts'),
        outputAs: 'interface',
      },
      installSubscriptionHandlers: true,
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
    AuthenticationModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
