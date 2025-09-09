import { useQuery } from "@tanstack/react-query";

import AI_CHARACTER_QUERY_KEYS from "@/domains/ai-character/constants/queryKey";
import getAiCharacters from "@/domains/ai-character/usecases/getAiCharacters";
import type { AiCharacter } from "@/domains/ai-character/models/aiCharacter";

const useAiCharacters = () => {
  return useQuery<AiCharacter[]>({
    queryKey: AI_CHARACTER_QUERY_KEYS.LIST,
    queryFn: getAiCharacters,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
    retry: false,
  });
};

export default useAiCharacters;
