export default class AiCharacterDto {
  readonly id: number;
  readonly name: string;
  readonly prompt: string;
  readonly thumbnailUrl: string;

  constructor(id: number, name: string, prompt: string, thumbnailUrl: string) {
    this.id = id;
    this.name = name;
    this.prompt = prompt;
    this.thumbnailUrl = thumbnailUrl;
  }
}
