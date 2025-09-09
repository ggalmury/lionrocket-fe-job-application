import aiCharacterRepository from "@/domains/ai-character/repositories/aiCharacterRepository";
import type { AiCharacter } from "@/domains/ai-character/models/aiCharacter";

const getAiCharacters = async (): Promise<AiCharacter[]> => {
  return await aiCharacterRepository();
};

export default getAiCharacters;
