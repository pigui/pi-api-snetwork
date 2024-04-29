import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { GenerateIdModule } from '@app/backend/shared/util/generate-id';
import { DateModule } from '@app/backend/shared/util/date';
import { UserFactory } from './factories/user.factory';
import { UsersInfraestructureModule } from '../infraestructure/users-infraestructure.module';
import { CreateUserWithPasswordCommandHandler } from './commands/create-user-with-password.command-handler';
import { UserCreatedEventHandler } from './events/user-created.event-handler';
import { UserSaga } from './sagas/user.saga';
import { GetUsersQueryHandler } from './queries/get-users.query-handler';
import { UsersController } from '../presentations/users.controller';

@Module({
  controllers: [UsersController],
  imports: [GenerateIdModule, DateModule, UsersInfraestructureModule],
  providers: [
    UsersService,
    UserFactory,
    CreateUserWithPasswordCommandHandler,
    UserCreatedEventHandler,
    GetUsersQueryHandler,
    UserSaga,
  ],
})
export class UsersModule {}
