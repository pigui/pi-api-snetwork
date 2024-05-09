import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { genSalt, hash, compare } from 'bcryptjs';

@Injectable()
export class BrcyptHashingService implements HashingService {
  async hash(data: string): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
