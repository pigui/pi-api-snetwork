import { Module } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { BrcyptHashingService } from './brcypt-hashing.service';

@Module({
  controllers: [],
  providers: [{ provide: HashingService, useClass: BrcyptHashingService }],
  exports: [HashingService],
})
export class HashingModule {}
