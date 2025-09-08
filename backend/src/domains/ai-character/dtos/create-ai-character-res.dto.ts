export default class CreateAiCharacterResDto {
  readonly id: number;
  readonly name: string;
  readonly thumbnailUrl: string;

  constructor(id: number, name: string, thumbnailUrl: string) {
    this.id = id;
    this.name = name;
    this.thumbnailUrl = thumbnailUrl;
  }
}
