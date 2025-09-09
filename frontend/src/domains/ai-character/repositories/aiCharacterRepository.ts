import { API_SERVER_URL } from "@/lib/constants/url";
import fetcher from "@/lib/apis/fetchers/fetcher";

import type { AiCharacter } from "@/domains/ai-character/models/aiCharacter";

const aiCharacterRepository = async (): Promise<AiCharacter[]> => {
  const endpoint: string = "ai-character";

  return await fetcher<AiCharacter[]>({
    url: API_SERVER_URL + endpoint,
    options: { method: "GET" },
    errorMessage: {
      404: "AI 캐릭터를 찾을 수 없어요.",
    },
    needAuth: true,
  });
};

export default aiCharacterRepository;
