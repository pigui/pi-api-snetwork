import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserWithPasswordInput } from './dto/create-user.input';
import { RedisPubSub } from '@app/backend/shared/common/pub';
import { FindUserByEmailInput } from './dto/find-user-by-email.input';
import { FindUserByIdInput } from './dto/find-user-by-id.input';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisPubSub: RedisPubSub
  ) {}

  @Query('findUsers')
  findUsers() {
    return this.usersService.find();
  }

  @Query('findUserByEmail')
  findUserByEmail(
    @Args('findUserByEmailInput') { email }: FindUserByEmailInput
  ) {
    return this.usersService.findByEmail(email);
  }

  @Query('findUserById')
  findUserById(@Args('findUserByIdInput') { id }: FindUserByIdInput) {
    return this.usersService.findById(id);
  }

  @Mutation('createUser')
  createUser(
    @Args('createUserWithPasswordInput')
    createUserWithPasswordInput: CreateUserWithPasswordInput
  ) {
    return this.usersService.createWithPassword(
      createUserWithPasswordInput.email,
      createUserWithPasswordInput.firstName,
      createUserWithPasswordInput.lastName,
      createUserWithPasswordInput.password
    );
  }

  @Subscription('userCreated')
  userCreated() {
    return this.redisPubSub.asyncIterator('userCreated');
  }
}
