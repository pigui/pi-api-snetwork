import { Module } from '@nestjs/common';
import { GenerateIdService } from './generate-id.service';
import { UuidGenerateIdService } from './uuid-generate-id.service';

@Module({
  providers: [{ provide: GenerateIdService, useClass: UuidGenerateIdService }],
  exports: [GenerateIdService],
})
export class GenerateIdModule {}
