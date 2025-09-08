import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import AuthModule from "@/domains/auth/auth.module";
import AiCharacterModule from "@/domains/ai-character/ai-character.module";

import AiChatController from "@/domains/ai-chat/ai-chat.controller";
import AiChatService from "@/domains/ai-chat/services/ai-chat.service";
import AiChatHistoryKeyvRepository from "@/domains/ai-chat/repositories/ai-chat-history.repository";
import AiChatEntity from "@/domains/ai-chat/entities/ai-chat.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AiChatEntity]), AuthModule, AiCharacterModule],
  controllers: [AiChatController],
  providers: [AiChatService, AiChatHistoryKeyvRepository],
  exports: [AiChatService],
})
export default class AiChatModule {}
