import { useMutation, useQueryClient } from "@tanstack/react-query";

import AI_CHARACTER_QUERY_KEYS from "@/domains/ai-character/constants/queryKey";
import createAiCharacter from "@/domains/ai-character/usecases/createAiCharacter";
import type { AiCharacterForm } from "@/domains/ai-character/models/aiCharacterForm";
import type { AiCharacter } from "@/domains/ai-character/models/aiCharacter";

interface useCreateAiCharacterProps {
  onSuccess?: () => void;
}

const useCreateAiCharacter = (props?: useCreateAiCharacterProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: AiCharacterForm) => await createAiCharacter(form),
    onSuccess: (data) => {
      queryClient.setQueryData<AiCharacter[]>(AI_CHARACTER_QUERY_KEYS.LIST, (prev) => (prev ? [...prev, data] : prev));

      if (props?.onSuccess) {
        props.onSuccess();
      }
    },
  });
};

export default useCreateAiCharacter;
