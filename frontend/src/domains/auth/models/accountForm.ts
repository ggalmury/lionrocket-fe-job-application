import { z } from "zod";

export const accountFormSchema = z.object({
  accountId: z.string().nonempty("아이디를 입력 해 주세요."),
  password: z.string().nonempty("비밀번호를 입력 해 주세요."),
});

export type AccountForm = z.infer<typeof accountFormSchema>;
