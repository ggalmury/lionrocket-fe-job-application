import { API_SERVER_URL } from "@/lib/constants/url";
import { CONTENT_TYPE_JSON } from "@/lib/apis/constants/contentType";
import fetcher from "@/lib/apis/fetchers/fetcher";

import type { AiChat } from "@/domains/ai-chat/models/aiChat";
import type { ChatRequest } from "@/domains/ai-chat/models/chatRequest";

const sendChatRepository = async (body: ChatRequest): Promise<AiChat> => {
  const endpoint: string = "ai-chat";

  return await fetcher<AiChat>({
    url: API_SERVER_URL + endpoint,
    options: {
      method: "POST",
      headers: {
        "Content-Type": CONTENT_TYPE_JSON,
      },
      body: JSON.stringify(body),
    },
    needAuth: true,
  });
};

export default sendChatRepository;
