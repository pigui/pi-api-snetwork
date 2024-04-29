import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserWithPasswordInput } from './dto/create-user.input';
import { RedisPubSub } from '@app/backend/shared/common/pub';

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
