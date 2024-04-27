import { GenerateIdService } from '@app/backend/shared/util/generate-id';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { DateService } from '@app/backend/shared/util/date';

@Injectable()
export class UserFactory {
  constructor(
    private readonly generateIdService: GenerateIdService,
    private readonly dateService: DateService
  ) {}

  create(email: string, firstName: string, lastName: string): User {
    const userId = this.generateIdService.generate();
    const now = this.dateService.now();
    return new User(userId, email, firstName, lastName, now, now);
  }
}
