import { Controller } from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMessages } from '@app/shared/common/messages';
import { CreateUserWithPasswordDto } from './dto/create-user-with-password.dto';
import { FindUserByEmailDto } from './dto/find-by-email.dto';
import { FindUserByIdDto } from './dto/find-by-id.dto';
import { User } from '../application/entities/user';
import { ComparePasswordDto } from './dto/compare-password.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(UserMessages.CREATE_USER_WITH_PASSWORD)
  createWithPassword(@Payload() createUserDto: CreateUserWithPasswordDto) {
    return this.usersService.createWithPassword(
      createUserDto.email,
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.password
    );
  }

  @MessagePattern(UserMessages.FIND)
  find() {
    return this.usersService.find();
  }

  @MessagePattern(UserMessages.FIND_BY_EMAIL)
  findByEmail(@Payload() { email }: FindUserByEmailDto) {
    return this.usersService.findByEmail(email);
  }

  @MessagePattern(UserMessages.FIND_BY_ID)
  findById(@Payload() { id }: FindUserByIdDto) {
    return this.usersService.findById(id);
  }

  @MessagePattern(UserMessages.GET_PASSWORD)
  getPassword(@Payload() user: User) {
    return this.usersService.getPassword(user);
  }

  @MessagePattern(UserMessages.COMPARE_PASSWORD)
  comparePassword(@Payload() { user, password }: ComparePasswordDto) {
    return this.usersService.comparePassword(user, password);
  }
}
