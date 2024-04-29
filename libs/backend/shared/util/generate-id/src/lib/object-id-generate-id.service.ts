import { Injectable } from '@nestjs/common';
import { GenerateIdService } from './generate-id.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class ObjectIdGenerateIdService implements GenerateIdService {
  generate(): string {
    const id = new ObjectId();
    return id.toString();
  }
}
