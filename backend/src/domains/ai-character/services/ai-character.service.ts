import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AiType } from "@/domains/ai-character/types/ai-type";

import AiCharacterEntity from "@/domains/ai-character/entities/ai-character.entity";
import CreateAiCharacterReqDto from "@/domains/ai-character/dtos/create-ai-character-req.dto";

@Injectable()
export default class AiCharacterService {
  constructor(
    @InjectRepository(AiCharacterEntity)
    private readonly aiCharacterRepository: Repository<AiCharacterEntity>,
  ) {}

  async findById(id: number): Promise<AiCharacterEntity> {
    const aiCharacter = await this.aiCharacterRepository.findOneBy({ id });
    if (!aiCharacter) {
      throw new NotFoundException(`Ai Character with id [${id}] not found`);
    }

    return aiCharacter;
  }

  async getAll(memberId: number): Promise<AiCharacterEntity[]> {
    const [defaultCharacters, customCharacters] = await Promise.all([
      this.aiCharacterRepository.find({
        where: { type: "default" as AiType },
        order: { id: "ASC" },
      }),
      this.aiCharacterRepository.find({
        where: { type: "custom" as AiType, member: { id: memberId } },
        order: { id: "ASC" },
      }),
    ]);

    return [...defaultCharacters, ...customCharacters];
  }

  async create(memberId: number, body: CreateAiCharacterReqDto, file: Express.Multer.File): Promise<AiCharacterEntity> {
    const { name, prompt } = body;
    const thumbnailUrl = `uploads/ai-characters/${file.filename}`;

    const createdAiCharacter = this.aiCharacterRepository.create({
      name,
      prompt,
      thumbnailUrl,
      type: AiType.Custom,
      member: { id: memberId },
    });

    return await this.aiCharacterRepository.save(createdAiCharacter);
  }
}
