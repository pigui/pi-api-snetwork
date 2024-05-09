import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { GenerateIdModule } from '@app/shared/util/generate-id';
import { DateModule } from '@app/shared/util/date';
import { UserFactory } from './factories/user.factory';
import { UsersInfraestructureModule } from '../infraestructure/users-infraestructure.module';
import { CreateUserWithPasswordCommandHandler } from './commands/create-user-with-password.command-handler';
import { UserCreatedEventHandler } from './events/user-created.event-handler';
import { UserSaga } from './sagas/user.saga';
import { GetUsersQueryHandler } from './queries/get-users.query-handler';
import { UsersController } from '../presentations/users.controller';
import { GetUserByEmailQueryHandler } from './queries/get-user-by-email.query-handler';
import { GetPasswordQueryHandler } from './queries/get-password.query-handler';
import { GetUserByIdQueryHandler } from './queries/get-user-by-id.query-handler';
import { ComparePasswordCommandHandler } from './commands/compare-password.command-handler';

@Module({
  controllers: [UsersController],
  imports: [GenerateIdModule, DateModule, UsersInfraestructureModule],
  providers: [
    UsersService,
    UserFactory,
    CreateUserWithPasswordCommandHandler,
    ComparePasswordCommandHandler,
    UserCreatedEventHandler,
    GetUsersQueryHandler,
    GetUserByEmailQueryHandler,
    GetPasswordQueryHandler,
    GetUserByIdQueryHandler,
    UserSaga,
  ],
})
export class UsersModule {}
