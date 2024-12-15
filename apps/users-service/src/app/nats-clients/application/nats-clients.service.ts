import { Inject, Injectable } from '@nestjs/common';
import {
  POSTS_MESSAGE_BROKER,
  USERS_MESSAGE_BROKER,
} from './constants/message-broker';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NatsClientsService {
  readonly usersBroker = USERS_MESSAGE_BROKER.description;
  readonly postsBroker = POSTS_MESSAGE_BROKER.description;
  constructor(
    @Inject(USERS_MESSAGE_BROKER) public readonly usersClient: ClientProxy,
    @Inject(POSTS_MESSAGE_BROKER) public readonly postsClient: ClientProxy
  ) {}
}
