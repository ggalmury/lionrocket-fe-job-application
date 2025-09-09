import { Controller, UseInterceptors, UseGuards, UploadedFile, Get, Post, Body } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { randomUUID } from "crypto";
import { extname } from "path";

import JwtAccessTokenGuard from "@/domains/auth/guards/jwt-access-token.guard";
import ExtractMemberId from "@/domains/auth/decorators/extract-member-id.decorator";

import { MAX_AI_CHARACTER_THUMBNAIL_SIZE } from "@/domains/ai-character/constants/constraint";
import AiCharacterService from "@/domains/ai-character/services/ai-character.service";
import AiCharacterDto from "@/domains/ai-character/dtos/ai-character.dto";
import CreateAiCharacterReqDto from "@/domains/ai-character/dtos/create-ai-character-req.dto";

@Controller("ai-character")
export default class AiCharacterController {
  constructor(private readonly aiCharacterService: AiCharacterService) {}

  @Get()
  @UseGuards(JwtAccessTokenGuard)
  async getAll(@ExtractMemberId() memberId: number): Promise<AiCharacterDto[]> {
    const aiCharacters = await this.aiCharacterService.getAll(memberId);

    return aiCharacters.map((aiCharacter) => {
      const { id, name, prompt, thumbnailUrl, type } = aiCharacter;

      return new AiCharacterDto(id, name, prompt, thumbnailUrl, type);
    });
  }

  @Post()
  @UseGuards(JwtAccessTokenGuard)
  @UseInterceptors(
    FileInterceptor("thumbnail", {
      storage: diskStorage({
        destination: "uploads/ai-characters",
        filename: (_req, file, callback) => callback(null, `${randomUUID()}${extname(file.originalname)}`),
      }),
      limits: { fileSize: MAX_AI_CHARACTER_THUMBNAIL_SIZE },
    }),
  )
  async create(
    @ExtractMemberId() memberId: number,
    @Body() body: CreateAiCharacterReqDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<AiCharacterDto> {
    const { id, name, prompt, thumbnailUrl, type } = await this.aiCharacterService.create(memberId, body, file);

    return new AiCharacterDto(id, name, prompt, thumbnailUrl, type);
  }
}
