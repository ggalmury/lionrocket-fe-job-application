import { Module, Global, DynamicModule } from "@nestjs/common";

import KeyvConfig, { KEYV_INSTANCE } from "@/config/keyv.config";

@Global()
@Module({})
export default class CacheModule {
  static forRoot(): DynamicModule {
    return {
      module: CacheModule,
      providers: [
        KeyvConfig,
        {
          provide: KEYV_INSTANCE,
          inject: [KeyvConfig],
          useFactory: (config: KeyvConfig) => config.createInstance(),
        },
      ],
      exports: [KEYV_INSTANCE],
    };
  }
}
