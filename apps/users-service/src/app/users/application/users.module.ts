import { InboxModule } from '@app/shared/common/inbox';
import { DateModule } from '@app/shared/util/date';
import { GenerateIdModule } from '@app/shared/util/generate-id';
import { Module } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NatsClientsModule } from '../../nats-clients/application/nats-clients.module';
import { NatsClientsService } from '../../nats-clients/application/nats-clients.service';
import { UsersInfraestructureModule } from '../infraestructure/users-infraestructure.module';
import { UsersController } from '../presentations/users.controller';
import { ComparePasswordCommandHandler } from './commands/compare-password.command-handler';
import { CreateUserWithPasswordCommandHandler } from './commands/create-user-with-password.command-handler';
import { DeleteUserCommandHandler } from './commands/delete-user.command-handler';
import { SoftdeleteUserCommandHandler } from './commands/softdelete-user.command-handler';
import { UserCreatedEventHandler } from './events/user-created.event-handler';
import { UserDeletedEventHandler } from './events/user-deleted.event-handler';
import { UserSoftdeletedEventHandler } from './events/user-softdeleted.event-handler';
import { UserFactory } from './factories/user.factory';
import { GetPasswordQueryHandler } from './queries/get-password.query-handler';
import { GetUserByEmailQueryHandler } from './queries/get-user-by-email.query-handler';
import { GetUserByIdQueryHandler } from './queries/get-user-by-id.query-handler';
import { GetUsersQueryHandler } from './queries/get-users.query-handler';
import { UserSaga } from './sagas/user.saga';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [
    GenerateIdModule,
    DateModule,
    UsersInfraestructureModule,
    NatsClientsModule,
    InboxModule.forRootAsync({
      useFactory: (natsClients: NatsClientsService) => {
        const clients = new Map<string, ClientProxy>();
        clients.set(natsClients.usersBroker, natsClients.usersClient);
        return {
          clients,
        };
      },
      inject: [NatsClientsService],
      imports: [NatsClientsModule],
    }),
  ],
  providers: [
    UsersService,
    UserFactory,
    CreateUserWithPasswordCommandHandler,
    ComparePasswordCommandHandler,
    DeleteUserCommandHandler,
    SoftdeleteUserCommandHandler,
    UserCreatedEventHandler,
    UserDeletedEventHandler,
    UserSoftdeletedEventHandler,
    GetUsersQueryHandler,
    GetUserByEmailQueryHandler,
    GetPasswordQueryHandler,
    GetUserByIdQueryHandler,
    UserSaga,
  ],
})
export class UsersModule {}
