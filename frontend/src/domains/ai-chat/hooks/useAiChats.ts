import { useQuery } from "@tanstack/react-query";

import AI_CHAT_QUERY_KEYS from "@/domains/ai-chat/constants/queryKey";
import getAiChats from "@/domains/ai-chat/usecases/getAiChats";
import type { AiChats } from "@/domains/ai-chat/models/aiChats";

const useAiChats = (aiCharacterId: number) => {
  return useQuery<AiChats>({
    queryKey: AI_CHAT_QUERY_KEYS.LIST(aiCharacterId),
    queryFn: async () => await getAiChats(aiCharacterId),
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
    retry: false,
  });
};

export default useAiChats;
