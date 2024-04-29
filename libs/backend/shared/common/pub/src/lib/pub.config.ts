import { Inject, Injectable } from '@nestjs/common';
import { PUB_MODULE_OPTIONS } from './pub.module-definition';

@Injectable()
export class PubConfig {
  constructor(
    @Inject(PUB_MODULE_OPTIONS)
    public readonly options: { redisHost: string; redisPort: number }
  ) {}
}
