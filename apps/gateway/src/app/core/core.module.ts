import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from './exceptions/rpc-exception.filter';

@Module({
  providers: [
    /*{
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },*/
  ],
})
export class CoreModule {}
