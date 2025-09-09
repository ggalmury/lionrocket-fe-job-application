import { useMutation, useQueryClient } from "@tanstack/react-query";

import AI_CHAT_QUERY_KEYS from "@/domains/ai-chat/constants/queryKey";
import { ChatterRole } from "@/domains/ai-chat/types/chatter-role";
import sendChat from "@/domains/ai-chat/usecases/sendChat";
import type { ChatRequest } from "@/domains/ai-chat/models/chatRequest";
import type { AiChats } from "@/domains/ai-chat/models/aiChats";
import type { ChatContent } from "@/domains/ai-chat/models/chatContent";
import { MAX_CHAT_LENGTH } from "../constants/constraint";

interface useSendChatProps {
  onSuccess?: () => void;
}

const useSendChat = (props?: useSendChatProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (chat: ChatRequest) => {
      const { aiCharacterId, content } = chat;

      if (content.length > MAX_CHAT_LENGTH) {
        return;
      }

      const myNewChat: ChatContent = { role: ChatterRole.User, content, createdAt: new Date() };

      queryClient.setQueryData<AiChats>(AI_CHAT_QUERY_KEYS.LIST(aiCharacterId), (prev) =>
        prev ? { ...prev, chats: [...(prev.chats ?? []), myNewChat] } : prev,
      );

      return await sendChat(chat);
    },
    onSuccess: (data) => {
      if (data) {
        const { aiCharacterId, chat } = data;

        queryClient.setQueryData<AiChats>(AI_CHAT_QUERY_KEYS.LIST(aiCharacterId), (prev) =>
          prev ? { ...prev, chats: [...(prev.chats ?? []), chat] } : prev,
        );

        if (props?.onSuccess) {
          props.onSuccess();
        }
      }
    },
  });
};

export default useSendChat;
