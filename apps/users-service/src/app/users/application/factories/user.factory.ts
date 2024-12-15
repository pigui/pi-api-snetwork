import { UserRole } from '@app/shared/entities';
import { DateService } from '@app/shared/util/date';
import { GenerateIdService } from '@app/shared/util/generate-id';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '../entities/user';

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
    const user = new User(
      userId,
      email,
      firstName,
      lastName,
      new UserRole('user'),
      now,
      now
    );
    this.logger.log('create', user);
    return user;
  }
}
