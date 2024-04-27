import { Test, TestingModule } from '@nestjs/testing';
import { BrcyptHashingService } from './brcypt-hashing.service';

describe('BrcyptHashingService', () => {
  let service: BrcyptHashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrcyptHashingService],
    }).compile();

    service = module.get<BrcyptHashingService>(BrcyptHashingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
