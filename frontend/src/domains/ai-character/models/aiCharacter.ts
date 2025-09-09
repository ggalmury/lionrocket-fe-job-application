import { z } from "zod";

import { AiType } from "@/domains/ai-character/types/ai-type";

export const aiCharacterSchema = z.object({
  id: z.number(),
  name: z.string().nonempty(),
  prompt: z.string().nonempty(),
  thumbnailUrl: z.string().nonempty(),
  type: z.enum(AiType),
});

export type AiCharacter = z.infer<typeof aiCharacterSchema>;
