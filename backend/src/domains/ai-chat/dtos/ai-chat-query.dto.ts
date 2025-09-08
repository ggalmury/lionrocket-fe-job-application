import { IsNotEmpty, IsNumber, IsEnum } from "class-validator";
import { Type } from "class-transformer";

export default class AiChatQueryDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly aiCharacterId: number;

  constructor(aiCharacterId: number) {
    this.aiCharacterId = aiCharacterId;
  }
}
