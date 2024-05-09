/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import configurations from './app/configs/configurations';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: configurations().natsUrl,
        queue: 'comments_service',
      },
    }
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen();
  Logger.log(`🚀 Comments Service`);
}

bootstrap();
