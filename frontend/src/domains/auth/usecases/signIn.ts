import { validateOrThrow } from "@/lib/utils/zod";
import { setAccessTokenToLocalStorage } from "@/lib/storages/accessToken";

import signInRepository from "@/domains/auth/repositories/signInRepository";
import { accountFormSchema, type AccountForm } from "@/domains/auth/models/accountForm";

const signIn = async (form: AccountForm): Promise<void> => {
  const validatedForm = validateOrThrow(accountFormSchema, form);

  const result = await signInRepository(validatedForm);
  const accessToken = result.accessToken;

  setAccessTokenToLocalStorage(accessToken);
};

export default signIn;
