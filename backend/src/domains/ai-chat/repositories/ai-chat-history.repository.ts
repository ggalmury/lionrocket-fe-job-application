import { Injectable, Inject } from "@nestjs/common";
import Keyv from "keyv";

import { REDIS_INSTANCE } from "@/config/redis.config";

import ChatContent from "@/domains/ai-chat/types/chat-content";

@Injectable()
export default class AiChatHistoryKeyvRepository {
  private readonly ttlMs: number = 10 * 60 * 1000;

  constructor(@Inject(REDIS_INSTANCE) private readonly cacheManager: Keyv) {}

  async set(memberId: number, aiCharacterId: number, contents: ChatContent[]): Promise<void> {
    const key = this.key(memberId, aiCharacterId);

    await this.cacheManager.set(key, contents, this.ttlMs);
  }

  async push(memberId: number, aiCharacterId: number, content: ChatContent): Promise<void> {
    const key = this.key(memberId, aiCharacterId);

    const chatHistories = (await this.cacheManager.get<ChatContent[]>(key)) ?? [];
    chatHistories.push(content);

    await this.cacheManager.set(key, chatHistories, this.ttlMs);
  }

  async getAll(memberId: number, aiCharacterId: number): Promise<ChatContent[]> {
    const key = this.key(memberId, aiCharacterId);

    return (await this.cacheManager.get<ChatContent[]>(key)) ?? [];
  }

  async clear(memberId: number, aiCharacterId: number): Promise<void> {
    const key = this.key(memberId, aiCharacterId);
    await this.cacheManager.delete(key);
  }

  private key(memberId: number, aiCharacterId: number): string {
    return `chat:member-${memberId}:aiCharacterId-${aiCharacterId}`;
  }
}
