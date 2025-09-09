import { useQuery } from "@tanstack/react-query";

import AUTH_QUERY_KEYS from "@/domains/auth/constants/queryKey";
import isLogin from "@/domains/auth/usecases/isLogin";

const useIsLogin = () => {
  return useQuery<boolean>({
    queryKey: AUTH_QUERY_KEYS.LOGIN_STATUS,
    queryFn: isLogin,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 30,
    retry: false,
  });
};

export default useIsLogin;
