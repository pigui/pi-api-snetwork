import { Module } from '@nestjs/common';
import { GenerateIdService } from './generate-id.service';
import { ObjectIdGenerateIdService } from './object-id-generate-id.service';

@Module({
  providers: [
    { provide: GenerateIdService, useClass: ObjectIdGenerateIdService },
  ],
  exports: [GenerateIdService],
})
export class GenerateIdModule {}
