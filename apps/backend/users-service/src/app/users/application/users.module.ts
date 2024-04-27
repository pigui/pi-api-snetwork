import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { GenerateIdModule } from '@app/backend/shared/util/generate-id';
import { DateModule } from '@app/backend/shared/util/date';
import { UserFactory } from './factories/user.factory';
import { UsersInfraestructureModule } from '../infraestructure/users-infraestructure.module';
import { CreateUserWithPasswordCommandHandler } from './commands/create-user-with-password.command-handler';
import { UserCreatedEventHandler } from './events/user-created.event-handler';
import { UserSaga } from './sagas/user.saga';

@Module({
  imports: [GenerateIdModule, DateModule, UsersInfraestructureModule],
  providers: [
    UsersService,
    UserFactory,
    CreateUserWithPasswordCommandHandler,
    UserCreatedEventHandler,
    UserSaga,
  ],
})
export class UsersModule {}
