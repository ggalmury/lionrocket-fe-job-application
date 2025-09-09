import { useMutation, useQueryClient } from "@tanstack/react-query";

import signOut from "@/domains/auth/usecases/signOut";

interface UseSignOutProps {
  onSuccess?: () => void;
}

const useSignOut = (props?: UseSignOutProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear();

      if (props?.onSuccess) {
        props.onSuccess();
      }
    },
  });
};

export default useSignOut;
