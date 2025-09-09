import { useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { toastError } from "@/lib/utils/ui";
import HttpError from "@/lib/errors/http/httpError";
import { deleteAccessTokenFromLocalStorage } from "@/lib/storages/accessToken";

interface QueryProviderProps {
  children: ReactNode;
}

const QueryProvider = ({ children }: QueryProviderProps) => {
  const navigate = useNavigate();
  const queryClientRef = useRef<QueryClient | null>(null);
  const signingOutRef = useRef(false);

  const signOut = async () => {
    if (signingOutRef.current) return;
    signingOutRef.current = true;

    toast.error("인증이 만료되었어요. 다시 로그인 해주세요.");
    deleteAccessTokenFromLocalStorage();

    await queryClientRef.current?.cancelQueries();
    queryClientRef.current?.clear();

    navigate("/sign-in", { replace: true });
  };

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();

    queryClientRef.current.getQueryCache().subscribe((event) => {
      if (event.type !== "updated") return;

      const { status, error } = event.query.state;
      if (status === "error" && error instanceof HttpError && error.statusCode === 401) {
        signOut();
      }
    });

    queryClientRef.current.setDefaultOptions({
      mutations: {
        onError: (error) => {
          if (error instanceof HttpError && error.statusCode === 401) {
            signOut();
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
