import { Inject, Injectable } from '@nestjs/common';
import { INBOX_MODULE_OPTIONS } from './inbox.module-definition';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class InboxClients {
  constructor(
    @Inject(INBOX_MODULE_OPTIONS)
    private readonly options: { clients: Map<string, ClientProxy> }
  ) {}

  getClient(key: string): ClientProxy {
    const client: ClientProxy | undefined = this.options?.clients?.get(key);
    if (!client) {
      throw Error('not found client');
    }
    return client;
  }
}
