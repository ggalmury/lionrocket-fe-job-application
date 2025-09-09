import { validateOrThrow } from "@/lib/utils/zod";

import sendChatRepository from "@/domains/ai-chat/repositories/sendChatRepository";
import { chatRequestSchema, type ChatRequest } from "@/domains/ai-chat/models/chatRequest";
import type { AiChat } from "@/domains/ai-chat/models/aiChat";

const sendChat = async (chat: ChatRequest): Promise<AiChat> => {
  const validatedChat = validateOrThrow(chatRequestSchema, chat);

  return await sendChatRepository(validatedChat);
};

export default sendChat;
