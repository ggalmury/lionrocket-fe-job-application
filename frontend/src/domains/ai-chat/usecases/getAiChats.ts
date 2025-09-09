import getAiChatsRepository from "@/domains/ai-chat/repositories/getAiChatsRepository";
import type { AiChats } from "@/domains/ai-chat/models/aiChats";

const getAiChats = async (aiCharacterId: number): Promise<AiChats> => {
  return await getAiChatsRepository(aiCharacterId);
};

export default getAiChats;
