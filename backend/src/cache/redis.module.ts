import { Module, Global, DynamicModule } from "@nestjs/common";

import RedisConfig, { REDIS_INSTANCE } from "@/config/redis.config";

@Global()
@Module({})
export default class RedisModule {
  static forRoot(): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        RedisConfig,
        {
          provide: REDIS_INSTANCE,
          inject: [RedisConfig],
          useFactory: (config: RedisConfig) => config.createInstance(),
        },
      ],
      exports: [REDIS_INSTANCE],
    };
  }
}
