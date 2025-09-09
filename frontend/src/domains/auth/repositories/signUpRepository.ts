import { API_SERVER_URL } from "@/lib/constants/url";
import { CONTENT_TYPE_JSON } from "@/lib/apis/constants/contentType";
import fetcher from "@/lib/apis/fetchers/fetcher";

import type { AccountForm } from "@/domains/auth/models/accountForm";
import type { SignUpResponse } from "@/domains/auth/models/signUpResponse";

const signUpRepository = async (body: AccountForm): Promise<SignUpResponse> => {
  const endpoint: string = "auth/sign-up";

  return await fetcher<SignUpResponse>({
    url: API_SERVER_URL + endpoint,
    options: {
      method: "POST",
      headers: {
        "Content-Type": CONTENT_TYPE_JSON,
      },
      body: JSON.stringify(body),
    },
    errorMessage: {
      409: "이미 존재하는 아이디에요.",
    },
  });
};

export default signUpRepository;
