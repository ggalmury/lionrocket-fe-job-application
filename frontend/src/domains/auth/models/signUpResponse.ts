import { z } from "zod";

export const signUpResponseSchema = z.object({
  id: z.number(),
  accountId: z.string(),
  accessToken: z.string(),
});

export type SignUpResponse = z.infer<typeof signUpResponseSchema>;
