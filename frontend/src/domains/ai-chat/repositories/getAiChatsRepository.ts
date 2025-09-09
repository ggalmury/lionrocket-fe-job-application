import { API_SERVER_URL } from "@/lib/constants/url";
import fetcher from "@/lib/apis/fetchers/fetcher";

import type { AiChats } from "@/domains/ai-chat/models/aiChats";

const getAiChatsRepository = async (aiCharacterId: number): Promise<AiChats> => {
  const endpoint: string = `ai-chat?aiCharacterId=${aiCharacterId}`;

  return await fetcher<AiChats>({
    url: API_SERVER_URL + endpoint,
    options: { method: "GET" },
    errorMessage: {
      404: "AI와의 대화를 찾을 수 없어요.",
    },
    needAuth: true,
  });
};

export default getAiChatsRepository;
