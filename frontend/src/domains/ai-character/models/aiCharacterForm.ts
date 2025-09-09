import { z } from "zod";

import {
  AI_CHARACTER_THUMBNAIL_TYPES,
  MAX_AI_CHARACTER_NAME_LENGTH,
  MAX_AI_CHARACTER_THUMBNAIL_SIZE,
} from "@/domains/ai-character/constants/constraint";

export const aiCharacterForm = z.object({
  name: z.string().nonempty("AI의 이름을 입력 해 주세요.").max(MAX_AI_CHARACTER_NAME_LENGTH),
  prompt: z.string().nonempty("AI의 프롬포트를 입력 해 주세요."),
  thumbnailImage: z
    .instanceof(File, { message: "이미지 파일만 사용 가능해요." })
    .refine((file) => AI_CHARACTER_THUMBNAIL_TYPES.includes(file!.type), { message: "지원하지 않는 이미지 형식이에요." })
    .refine((file) => file!.size <= MAX_AI_CHARACTER_THUMBNAIL_SIZE, {
      message: `이미지 용량은 최대 ${Math.round(MAX_AI_CHARACTER_THUMBNAIL_SIZE / 1024 / 1024)}MB예요.`,
    }),
});

export type AiCharacterForm = z.infer<typeof aiCharacterForm>;
