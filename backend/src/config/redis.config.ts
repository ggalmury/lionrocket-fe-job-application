import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import KeyvRedis, { Keyv } from "@keyv/redis";

export const REDIS_INSTANCE = Symbol("redis instance");

@Injectable()
export default class RedisConfig {
  constructor(private readonly configService: ConfigService) {}

  createInstance(): Keyv {
    return new Keyv({
      namespace: this.configService.get<string>("REDIS_NAMESPACE", "cache"),
      store: new KeyvRedis(this.configService.get<string>("REDIS_URI", "redis://localhost:6379"), {}),
    });
  }
}
