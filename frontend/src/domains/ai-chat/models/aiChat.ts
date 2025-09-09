import { z } from "zod";

import { chatContentSchema } from "@/domains/ai-chat/models/chatContent";

export const aiChat = z.object({
  aiCharacterId: z.number(),
  chat: chatContentSchema,
});

export type AiChat = z.infer<typeof aiChat>;
