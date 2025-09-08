import { AiType } from "@/domains/ai-character/types/ai-type";

export default class AiCharacterDto {
  readonly id: number;
  readonly name: string;
  readonly prompt: string;
  readonly thumbnailUrl: string;
  readonly type: AiType;

  constructor(id: number, name: string, prompt: string, thumbnailUrl: string, type: AiType) {
    this.id = id;
    this.name = name;
    this.prompt = prompt;
    this.thumbnailUrl = thumbnailUrl;
    this.type = type;
  }
}
