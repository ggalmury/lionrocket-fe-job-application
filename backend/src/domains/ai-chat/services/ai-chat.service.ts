import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import AiCharacterService from "@/domains/ai-character/services/ai-character.service";

import { ChatterRole } from "@/domains/ai-chat/types/chatter-role";
import ChatContent from "@/domains/ai-chat/types/chat-content";
import AiChatHistoryKeyvRepository from "@/domains/ai-chat/repositories/ai-chat-history.repository";
import AiChatEntity from "@/domains/ai-chat/entities/ai-chat.entity";
import AiChatContentDto from "@/domains/ai-chat/dtos/ai-chat-content.dto";
import AiChatReqDto from "@/domains/ai-chat/dtos/ai-chat-req.dto";

@Injectable()
export default class AiChatService {
  constructor(
    private readonly configService: ConfigService,
    private readonly aiCharacterService: AiCharacterService,
    @InjectRepository(AiChatEntity)
    private readonly aiChatRepository: Repository<AiChatEntity>,
    private readonly aiChatHistoryKeyvRepository: AiChatHistoryKeyvRepository,
  ) {}

  async getAll(memberId: number, aiCharacterId: number): Promise<ChatContent[]> {
    const cachedChatHistories = await this.aiChatHistoryKeyvRepository.getAll(memberId, aiCharacterId);
    if (cachedChatHistories.length > 0) {
      return cachedChatHistories;
    }

    const chats = await this.aiChatRepository.find({
      where: { member: { id: memberId }, character: { id: aiCharacterId } },
      order: { createdAt: "ASC" },
    });
    const contents = chats.map<ChatContent>((chat) => {
      const { role, content, createdAt } = chat;

      return { role, content, createdAt };
    });

    await this.aiChatHistoryKeyvRepository.set(memberId, aiCharacterId, contents);

    return contents;
  }

  async chat(memberId: number, dto: AiChatReqDto): Promise<ChatContent> {
    const { aiCharacterId, content: userText } = dto;

    const aiCharacter = await this.aiCharacterService.findById(aiCharacterId);

    const cachedChatHistories = await this.aiChatHistoryKeyvRepository.getAll(memberId, aiCharacterId);

    const system = `당신의 역할: ${aiCharacter.prompt}, 당신의 이름: ${aiCharacter.name} / 모든 대화는 강조, 이탤릭 등 꾸밈 요소 없이 한 문단의 문자열 평문으로만 제공합니다. AI 어시스턴스로서가 아니라 역할에 충실하며, 기계같이 대화하지 않고 역할에 맞는 응답을 합니다.`;
    const model = this.configService.getOrThrow<string>("CLAUDE_MODEL");
    const maxTokens = Number(this.configService.getOrThrow<number>("CLAUDE_MAX_TOKENS"));

    const pastChatHistories = cachedChatHistories.map((history) => {
      const { role, content } = history;

      return new AiChatContentDto(role, content);
    });
    const userMessage = new AiChatContentDto(ChatterRole.User, userText);

    const apiKey = this.configService.getOrThrow<string>("ANTHROPIC_API_KEY");
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        system,
        messages: [...pastChatHistories, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new InternalServerErrorException(`Claude API error: ${response.status} ${text}`);
    }

    const responseBody = await response.json();
    const assistantText = Array.isArray(responseBody.content) ? (responseBody.content.find((c: any) => c.type === "text")?.text ?? "") : "";

    const assistantMsg = { role: ChatterRole.Assistant, content: assistantText };

    const userEntity = this.aiChatRepository.create({
      role: ChatterRole.User,
      content: userText,
      member: { id: memberId },
      character: { id: aiCharacterId },
    });
    const assistantEntity = this.aiChatRepository.create({
      role: ChatterRole.Assistant,
      content: assistantMsg.content,
      member: { id: memberId },
      character: { id: aiCharacterId },
    });

    await this.aiChatRepository.save([userEntity, assistantEntity]);

    await this.aiChatHistoryKeyvRepository.push(memberId, aiCharacterId, {
      role: ChatterRole.User,
      content: userText,
      createdAt: userEntity.createdAt,
    });
    await this.aiChatHistoryKeyvRepository.push(memberId, aiCharacterId, {
      role: ChatterRole.Assistant,
      content: assistantMsg.content,
      createdAt: assistantEntity.createdAt,
    });

    return {
      role: ChatterRole.Assistant,
      content: assistantMsg.content,
      createdAt: assistantEntity.createdAt,
    };
  }
}
