import { Injectable } from '@nestjs/common';
import { DateService } from './date.service';

@Injectable()
export class DateFnsService implements DateService {
  now(): Date {
    return new Date();
  }
}
