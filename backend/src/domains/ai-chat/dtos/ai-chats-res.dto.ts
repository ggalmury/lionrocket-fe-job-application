import ChatContent from "@/domains/ai-chat/types/chat-content";

export default class AiChatsResDto {
  readonly aiCharacterId: number;
  readonly chats: ChatContent[];

  constructor(aiCharacterId: number, chats: ChatContent[]) {
    this.aiCharacterId = aiCharacterId;
    this.chats = chats;
  }
}
