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
import AiCharactersResDto from "@/domains/ai-character/dtos/ai-characters-res.dto";
import CreateAiCharacterResDto from "@/domains/ai-character/dtos/create-ai-character-res.dto";

@Controller("ai-character")
export default class AiCharacterController {
  constructor(private readonly aiCharacterService: AiCharacterService) {}

  @Get()
  @UseGuards(JwtAccessTokenGuard)
  async getAll(@ExtractMemberId() memberId: number): Promise<AiCharactersResDto> {
    const { defaultCharacters, customCharacters } = await this.aiCharacterService.getAll(memberId);

    return {
      defaultCharacters: defaultCharacters.map((defaultCharacter) => {
        const { id, name, prompt, thumbnailUrl } = defaultCharacter;

        return new AiCharacterDto(id, name, prompt, thumbnailUrl);
      }),
      customCharacters: customCharacters.map((customCharacter) => {
        const { id, name, prompt, thumbnailUrl } = customCharacter;

        return new AiCharacterDto(id, name, prompt, thumbnailUrl);
      }),
    };
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
  ): Promise<CreateAiCharacterResDto> {
    const { id, name, thumbnailUrl } = await this.aiCharacterService.create(memberId, body, file);

    return { id, name, thumbnailUrl };
  }
}
