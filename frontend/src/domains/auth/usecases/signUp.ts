import { validateOrThrow } from "@/lib/utils/zod";
import { setAccessTokenToLocalStorage } from "@/lib/storages/accessToken";

import signUpRepository from "@/domains/auth/repositories/signUpRepository";
import { type AccountForm } from "@/domains/auth/models/accountForm";
import { signUpFormSchema, type SignUpForm } from "@/domains/auth/models/signUpForm";

const signUp = async (form: SignUpForm): Promise<void> => {
  const validatedForm = validateOrThrow(signUpFormSchema, form);
  const { accountId, password } = validatedForm;

  const accountForm: AccountForm = { accountId, password };

  const result = await signUpRepository(accountForm);
  const accessToken = result.accessToken;

  setAccessTokenToLocalStorage(accessToken);
};

export default signUp;
