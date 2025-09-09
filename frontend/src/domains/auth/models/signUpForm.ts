import { z } from "zod";

export const signUpFormSchema = z
  .object({
    accountId: z.string().nonempty("아이디를 입력 해 주세요."),
    password: z.string().nonempty("비밀번호를 입력 해 주세요."),
    passwordcheck: z.string().nonempty("비밀번호 확인을 입력 해 주세요."),
  })
  .refine((data) => data.password === data.passwordcheck, {
    path: ["passwordcheck"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type SignUpForm = z.infer<typeof signUpFormSchema>;
