import { Test, TestingModule } from '@nestjs/testing';
import { PostUserResolver } from './post-user.resolver';

describe('PostUserResolver', () => {
  let resolver: PostUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostUserResolver],
    }).compile();

    resolver = module.get<PostUserResolver>(PostUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
