import { Test, TestingModule } from '@nestjs/testing';
import { UuidGenerateIdService } from './uuid-generate-id.service';

describe('UuidGenerateIdService', () => {
  let service: UuidGenerateIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UuidGenerateIdService],
    }).compile();

    service = module.get<UuidGenerateIdService>(UuidGenerateIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
