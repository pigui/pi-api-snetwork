import { Controller } from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMessages } from '@app/backend/shared/common/messages';
import { CreateUserWithPasswordDto } from './dto/create-user-with-password.dto';

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
}
