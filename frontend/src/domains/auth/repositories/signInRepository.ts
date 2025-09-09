import { API_SERVER_URL } from "@/lib/constants/url";
import { CONTENT_TYPE_JSON } from "@/lib/apis/constants/contentType";
import fetcher from "@/lib/apis/fetchers/fetcher";

import type { AccountForm } from "@/domains/auth/models/accountForm";
import type { SignInResponse } from "@/domains/auth/models/signInResponse";

const signInRepository = async (body: AccountForm): Promise<SignInResponse> => {
  const endpoint: string = "auth/sign-in";

  return await fetcher<SignInResponse>({
    url: API_SERVER_URL + endpoint,
    options: {
      method: "POST",
      headers: {
        "Content-Type": CONTENT_TYPE_JSON,
      },
      body: JSON.stringify(body),
    },
    errorMessage: {
      404: "계정 정보를 찾을 수 없어요.",
    },
  });
};

export default signInRepository;
