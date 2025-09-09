import { useMutation, useQueryClient } from "@tanstack/react-query";

import signIn from "@/domains/auth/usecases/signIn";
import type { AccountForm } from "@/domains/auth/models/accountForm";

interface UseSignInProps {
  onSuccess?: () => void;
}

const useSignIn = (props?: UseSignInProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: AccountForm) => await signIn(form),
    onSuccess: () => {
      queryClient.clear();

      if (props?.onSuccess) {
        props.onSuccess();
      }
    },
  });
};

export default useSignIn;
