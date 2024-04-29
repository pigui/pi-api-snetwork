import { Test, TestingModule } from '@nestjs/testing';
import { ObjectIdGenerateIdService } from './object-id-generate-id.service';

describe('ObjectIdGenerateIdService', () => {
  let service: ObjectIdGenerateIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObjectIdGenerateIdService],
    }).compile();

    service = module.get<ObjectIdGenerateIdService>(ObjectIdGenerateIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
