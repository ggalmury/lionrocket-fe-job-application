import { useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { toastError } from "@/lib/utils/ui";
import HttpError from "@/lib/errors/http/httpError";

interface QueryProviderProps {
  children: ReactNode;
}

const QueryProvider = ({ children }: QueryProviderProps) => {
  const navigate = useNavigate();
  const queryClientRef = useRef<QueryClient | null>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
    queryClientRef.current.setDefaultOptions({
      mutations: {
        onError: (error) => {
          if (error instanceof HttpError && error.statusCode === 401) {
            toast.error("인증이 만료되었어요. 다시 로그인 해주세요.");

            queryClientRef.current?.clear();

            navigate("/", { replace: true });
            return;
          }
          toastError(error);
        },
      },
    });
  }

  return <QueryClientProvider client={queryClientRef.current!}>{children}</QueryClientProvider>;
};

export default QueryProvider;
