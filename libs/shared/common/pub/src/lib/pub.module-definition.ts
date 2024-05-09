import { ConfigurableModuleBuilder } from '@nestjs/common';
export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: PUB_MODULE_OPTIONS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<{
  redisHost: string;
  redisPort: number;
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
