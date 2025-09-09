import { z } from "zod";

export const signInResponseSchema = z.object({
  accessToken: z.string(),
});

export type SignInResponse = z.infer<typeof signInResponseSchema>;
