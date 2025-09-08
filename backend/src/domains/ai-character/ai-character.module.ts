import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import AuthModule from "@/domains/auth/auth.module";

import AiCharacterController from "@/domains/ai-character/ai-character.controller";
import AiCharacterService from "@/domains/ai-character/services/ai-character.service";
import DefaultAiCharacterEntity from "@/domains/ai-character/entities/default-ai-character.entity";
import CustomAiCharacterEntity from "@/domains/ai-character/entities/custom-ai-character.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DefaultAiCharacterEntity, CustomAiCharacterEntity]), AuthModule],
  controllers: [AiCharacterController],
  providers: [AiCharacterService],
  exports: [],
})
export default class AiCharacterModule {}
