import { Controller, UseGuards, Get, Post, Body, Query } from "@nestjs/common";

import JwtAccessTokenGuard from "@/domains/auth/guards/jwt-access-token.guard";
import ExtractMemberId from "@/domains/auth/decorators/extract-member-id.decorator";

import AiChatService from "@/domains/ai-chat/services/ai-chat.service";
import AiChatQueryDto from "@/domains/ai-chat/dtos/ai-chat-query.dto";
import AiChatReqDto from "@/domains/ai-chat/dtos/ai-chat-req.dto";
import AiChatsResDto from "@/domains/ai-chat/dtos/ai-chats-res.dto";
import AiChatResDto from "@/domains/ai-chat/dtos/ai-chat-res.dto";

@Controller("ai-chat")
export default class AiChatController {
  constructor(private readonly aiChatService: AiChatService) {}

  @Get()
  @UseGuards(JwtAccessTokenGuard)
  async getAll(@ExtractMemberId() memberId: number, @Query() query: AiChatQueryDto): Promise<AiChatsResDto> {
    const { aiCharacterId } = query;
    const chats = await this.aiChatService.getAll(memberId, aiCharacterId);

    return { aiCharacterId, chats };
  }

  @Post()
  @UseGuards(JwtAccessTokenGuard)
  async chat(@ExtractMemberId() memberId: number, @Body() body: AiChatReqDto): Promise<AiChatResDto> {
    const { aiCharacterId } = body;
    const chat = await this.aiChatService.chat(memberId, body);

    return { aiCharacterId, chat };
  }
}
