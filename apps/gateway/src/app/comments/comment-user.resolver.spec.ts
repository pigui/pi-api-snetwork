import { Test, TestingModule } from '@nestjs/testing';
import { CommentUserResolver } from './comment-user.resolver';

describe('CommentUserResolver', () => {
  let resolver: CommentUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentUserResolver],
    }).compile();

    resolver = module.get<CommentUserResolver>(CommentUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
