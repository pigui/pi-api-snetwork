import { Test, TestingModule } from '@nestjs/testing';
import { NatsClientsService } from './nats-clients.service';

describe('NatsClientsService', () => {
  let service: NatsClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NatsClientsService],
    }).compile();

    service = module.get<NatsClientsService>(NatsClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
