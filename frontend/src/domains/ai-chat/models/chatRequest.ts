import { z } from "zod";

import { MAX_CHAT_LENGTH } from "@/domains/ai-chat/constants/constraint";

export const chatRequestSchema = z.object({
  aiCharacterId: z.number(),
  content: z
    .string()
    .nonempty()
    .max(MAX_CHAT_LENGTH, { error: `메세지는 최대 ${MAX_CHAT_LENGTH}자 이하입니다.` }),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
