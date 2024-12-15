import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ComparePasswordCommand } from './commands/compare-password.command';
import { CreateUserWithPasswordCommand } from './commands/create-user-with-password.command';
import { DeleteUserCommand } from './commands/delete-user.command';
import { SoftdeleteUserCommand } from './commands/softdelete-user.command';
import { User } from './entities/user';
import { GetPasswordQuery } from './queries/get-password.query';
import { GetUserByEmailQuery } from './queries/get-user-by-email.query';
import { GetUserByIdQuery } from './queries/get-user-by-id.query';
import { GetUsersQuery } from './queries/get-users.query';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  find(): Promise<Array<User>> {
    this.logger.log('find');
    return this.queryBus.execute<GetUsersQuery, Array<User>>(
      new GetUsersQuery()
    );
  }

  findByEmail(email: string): Promise<User> {
    this.logger.log('findByEmail', email);
    return this.queryBus.execute<GetUserByEmailQuery, User>(
      new GetUserByEmailQuery(email)
    );
  }

  findById(id: string): Promise<User> {
    this.logger.log('findById', id);
    return this.queryBus.execute<GetUserByIdQuery, User>(
      new GetUserByIdQuery(id)
    );
  }

  getPassword(user: User): Promise<string> {
    this.logger.log('getPassword', user);
    return this.queryBus.execute<GetPasswordQuery, string>(
      new GetPasswordQuery(user)
    );
  }

  createWithPassword(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User> {
    return this.commandBus.execute(
      new CreateUserWithPasswordCommand(email, firstName, lastName, password)
    );
  }

  comparePassword(user: User, password: string): Promise<boolean> {
    return this.commandBus.execute<ComparePasswordCommand, boolean>(
      new ComparePasswordCommand(user, password)
    );
  }

  delete(user: User): Promise<User> {
    return this.commandBus.execute<DeleteUserCommand, User>(
      new DeleteUserCommand(user)
    );
  }

  softdelete(user: User): Promise<User> {
    return this.commandBus.execute<SoftdeleteUserCommand, User>(
      new SoftdeleteUserCommand(user)
    );
  }
}
