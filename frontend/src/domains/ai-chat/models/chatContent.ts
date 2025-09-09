import { z } from "zod";

import { ChatterRole } from "@/domains/ai-chat/types/chatter-role";

export const chatContentSchema = z.object({
  role: z.enum(ChatterRole),
  content: z.string(),
  createdAt: z.date(),
});

export type ChatContent = z.infer<typeof chatContentSchema>;
