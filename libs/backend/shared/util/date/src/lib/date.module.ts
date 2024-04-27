import { Module } from '@nestjs/common';
import { DateService } from './date.service';
import { DateFnsService } from './date-fns.service';

@Module({
  controllers: [],
  providers: [{ provide: DateService, useClass: DateFnsService }],
  exports: [DateService],
})
export class DateModule {}
