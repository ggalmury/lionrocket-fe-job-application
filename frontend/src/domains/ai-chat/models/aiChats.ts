import { z } from "zod";

import { chatContentSchema } from "@/domains/ai-chat/models/chatContent";

export const aiChats = z.object({
  aiCharacterId: z.number(),
  chats: z.array(chatContentSchema),
});

export type AiChats = z.infer<typeof aiChats>;
