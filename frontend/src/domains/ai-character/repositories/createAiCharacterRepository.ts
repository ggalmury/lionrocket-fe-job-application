import { API_SERVER_URL } from "@/lib/constants/url";
import fetcher from "@/lib/apis/fetchers/fetcher";

import type { AiCharacterForm } from "@/domains/ai-character/models/aiCharacterForm";
import type { AiCharacter } from "@/domains/ai-character/models/aiCharacter";

const createAiCharacterRepository = async (body: AiCharacterForm): Promise<AiCharacter> => {
  const endpoint: string = "ai-character";

  const { name, prompt, thumbnailImage } = body;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("prompt", prompt);
  formData.append("thumbnail", thumbnailImage);

  return await fetcher<AiCharacter>({
    url: API_SERVER_URL + endpoint,
    options: {
      method: "POST",
      body: formData,
    },
    needAuth: true,
  });
};

export default createAiCharacterRepository;
