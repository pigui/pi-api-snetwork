import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ComparePasswordCommand } from './compare-password.command';
import { UserRepository } from '../repositories/user.repository';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(ComparePasswordCommand)
export class ComparePasswordCommandHandler
  implements ICommandHandler<ComparePasswordCommand, boolean>
{
  constructor(private readonly userRepository: UserRepository) {}
  execute(command: ComparePasswordCommand): Promise<boolean> {
    const comparePassword$ = this.userRepository
      .comparePassword(command.user, command.password)
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
    return lastValueFrom(comparePassword$);
  }
}
