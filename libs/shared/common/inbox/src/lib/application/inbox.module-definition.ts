import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: INBOX_MODULE_OPTIONS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<{
  clients: Map<string, ClientProxy>;
}>({ alwaysTransient: true })
  .setClassMethodName('forRoot')
  .setExtras<{ isGlobal?: boolean }>(
    {
      isGlobal: true,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    })
  )
  .build();
