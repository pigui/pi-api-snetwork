import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from './queries/get-users.query';
import { User } from './entities/user';
import { CreateUserWithPasswordCommand } from './commands/create-user-with-password.command';

@Injectable()
export class UsersService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  find(): Promise<Array<User>> {
    return this.queryBus.execute<GetUsersQuery, Array<User>>(
      new GetUsersQuery()
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
}
