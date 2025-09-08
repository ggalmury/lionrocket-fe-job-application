import { IsNotEmpty, IsString, MaxLength } from "class-validator";

import { MAX_AI_CHARACTER_NAME_LENGTH } from "@/domains/ai-character/constants/constraint";

export default class CreateAiCharacterReqDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(MAX_AI_CHARACTER_NAME_LENGTH)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly prompt: string;

  constructor(name: string, prompt: string) {
    this.name = name;
    this.prompt = prompt;
  }
}
