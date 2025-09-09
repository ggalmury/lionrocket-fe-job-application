import { API_SERVER_URL } from "@/lib/constants/url";
import fetcher from "@/lib/apis/fetchers/fetcher";

const loginStatusRepository = async (): Promise<void> => {
  const endpoint: string = "auth/status";

  await fetcher({
    url: API_SERVER_URL + endpoint,
    options: { method: "GET" },
    needAuth: true,
  });
};

export default loginStatusRepository;
