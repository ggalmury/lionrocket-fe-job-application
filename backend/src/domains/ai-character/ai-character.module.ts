import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import AuthModule from "@/domains/auth/auth.module";

import AiCharacterController from "@/domains/ai-character/ai-character.controller";
import AiCharacterService from "@/domains/ai-character/services/ai-character.service";
import AiCharacterEntity from "@/domains/ai-character/entities/ai-character.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AiCharacterEntity]), AuthModule],
  controllers: [AiCharacterController],
  providers: [AiCharacterService],
  exports: [AiCharacterService],
})
export default class AiCharacterModule {}
