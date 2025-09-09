import { validateOrThrow } from "@/lib/utils/zod";

import createAiCharacterRepository from "@/domains/ai-character/repositories/createAiCharacterRepository";
import { aiCharacterForm, type AiCharacterForm } from "@/domains/ai-character/models/aiCharacterForm";
import type { AiCharacter } from "@/domains/ai-character/models/aiCharacter";

const createAiCharacter = async (form: AiCharacterForm): Promise<AiCharacter> => {
  const validatedForm = validateOrThrow(aiCharacterForm, form);

  return await createAiCharacterRepository(validatedForm);
};

export default createAiCharacter;
