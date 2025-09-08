import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import AiCharacterEntity from "@/domains/ai-character/entities/ai-character.entity";
import DefaultAiCharacterEntity from "@/domains/ai-character/entities/default-ai-character.entity";
import CustomAiCharacterEntity from "@/domains/ai-character/entities/custom-ai-character.entity";
import CreateAiCharacterReqDto from "@/domains/ai-character/dtos/create-ai-character-req.dto";

@Injectable()
export default class AiCharacterService {
  constructor(
    @InjectRepository(DefaultAiCharacterEntity)
    private readonly defaultAiCharacterRepository: Repository<DefaultAiCharacterEntity>,
    @InjectRepository(CustomAiCharacterEntity)
    private readonly customAiCharacterRepository: Repository<CustomAiCharacterEntity>,
  ) {}

  async getAll(memberId: number): Promise<{ defaultCharacters: DefaultAiCharacterEntity[]; customCharacters: CustomAiCharacterEntity[] }> {
    const defaultAiCharacters = await this.defaultAiCharacterRepository.find({ order: { id: "ASC" } });
    const customAiCharacters = await this.customAiCharacterRepository.find({ where: { member: { id: memberId } }, order: { id: "ASC" } });

    return { defaultCharacters: defaultAiCharacters, customCharacters: customAiCharacters };
  }

  async create(memberId: number, body: CreateAiCharacterReqDto, file: Express.Multer.File): Promise<CustomAiCharacterEntity> {
    const { name, prompt } = body;
    const thumbnailUrl = `uploads/ai-characters/${file.filename}`;

    const createdAiCharacter = this.customAiCharacterRepository.create({
      name,
      prompt,
      thumbnailUrl,
      member: { id: memberId },
    });

    return await this.customAiCharacterRepository.save(createdAiCharacter);
  }
}
