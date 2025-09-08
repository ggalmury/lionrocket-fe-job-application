import ChatContent from "@/domains/ai-chat/types/chat-content";

export default class AiChatResDto {
  readonly aiCharacterId: number;
  readonly chat: ChatContent;

  constructor(aiCharacterId: number, chat: ChatContent) {
    this.aiCharacterId = aiCharacterId;
    this.chat = chat;
  }
}
