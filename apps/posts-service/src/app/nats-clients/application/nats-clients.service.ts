import { Inject, Injectable } from '@nestjs/common';
import { USERS_MESSAGE_BROKER } from './constants/message-broker';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NatsClientsService {
  readonly usersBroker = USERS_MESSAGE_BROKER.description;

  constructor(
    @Inject(USERS_MESSAGE_BROKER) public readonly usersClient: ClientProxy
  ) {}
}
