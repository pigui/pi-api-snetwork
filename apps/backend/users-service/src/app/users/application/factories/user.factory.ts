import { GenerateIdService } from '@app/backend/shared/util/generate-id';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '../entities/user';
import { DateService } from '@app/backend/shared/util/date';

@Injectable()
export class UserFactory {
  private readonly logger = new Logger(UserFactory.name);
  constructor(
    private readonly generateIdService: GenerateIdService,
    private readonly dateService: DateService
  ) {}

  create(email: string, firstName: string, lastName: string): User {
    const userId = this.generateIdService.generate();
    const now = this.dateService.now();
    const user = new User(userId, email, firstName, lastName, now, now);
    this.logger.log('create', user);
    return user;
  }
}
