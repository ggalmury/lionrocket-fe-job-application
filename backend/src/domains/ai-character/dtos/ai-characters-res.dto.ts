import AiCharacterDto from "@/domains/ai-character/dtos/ai-character.dto";

export default class AiCharactersResDto {
  readonly defaultCharacters: AiCharacterDto[];
  readonly customCharacters: AiCharacterDto[];

  constructor(defaultCharacters: AiCharacterDto[], customCharacters: AiCharacterDto[]) {
    this.defaultCharacters = defaultCharacters;
    this.customCharacters = customCharacters;
  }
}
