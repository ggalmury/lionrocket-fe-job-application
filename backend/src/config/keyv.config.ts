import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Keyv from "keyv";

export const KEYV_INSTANCE = Symbol("keyv instance");

@Injectable()
export default class KeyvConfig {
  constructor(private readonly configService: ConfigService) {}

  createInstance(): Keyv {
    const namespace = this.configService.get<string>("KEYV_NAMESPACE", "cache");
    const keyv = new Keyv({ namespace });
    keyv.on("error", (err) => console.error("[Keyv] error:", err));

    return keyv;
  }
}
