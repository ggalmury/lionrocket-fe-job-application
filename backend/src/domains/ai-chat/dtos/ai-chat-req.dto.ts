import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

import { MAX_AI_CHAT_LENGTH } from "@/domains/ai-chat/constants/constraint";

export default class AiChatReqDto {
  @IsNotEmpty()
  @IsNumber()
  readonly aiCharacterId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(MAX_AI_CHAT_LENGTH)
  readonly content: string;

  constructor(aiCharacterId: number, content: string) {
    this.aiCharacterId = aiCharacterId;
    this.content = content;
  }
}
