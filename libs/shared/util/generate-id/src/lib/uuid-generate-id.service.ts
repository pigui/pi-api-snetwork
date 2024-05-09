import { Injectable } from '@nestjs/common';
import { GenerateIdService } from './generate-id.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UuidGenerateIdService implements GenerateIdService {
  generate(): string {
    return uuidv4();
  }
}
