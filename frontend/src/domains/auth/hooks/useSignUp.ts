import { useMutation } from "@tanstack/react-query";

import signUp from "@/domains/auth/usecases/signUp";
import type { SignUpForm } from "@/domains/auth//models/signUpForm";

interface UseSignUpProps {
  onSuccess?: () => void;
}

const useSignUp = (props?: UseSignUpProps) => {
  return useMutation({
    mutationFn: async (form: SignUpForm) => await signUp(form),
    onSuccess: props?.onSuccess,
  });
};

export default useSignUp;
