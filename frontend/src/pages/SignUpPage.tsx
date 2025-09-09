import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { parseFormData } from "@/lib/utils/parser/formdata";

import Page from "@/components/layouts/Page";
import AuthForm from "@/components/organisms/auth/AuthForm";
import useSignUp from "@/domains/auth/hooks/useSignUp";
import type { SignUpForm } from "@/domains/auth/models/signUpForm";

const SignUpPage = () => {
  const navigate = useNavigate();

  const { mutate: signUp } = useSignUp({
    onSuccess: () => {
      toast.info("회원가입이 완료되었어요.");
      navigate("/sign-in", { replace: true });
    },
  });

  return (
    <Page justifyCenter itemsCenter>
      <AuthForm
        title="회원가입"
        subtitle="아이디와 비밀번호를 생성해 주세요"
        fields={[
          { label: "아이디", name: "accountId", placeholder: "example@gmail.com" },
          { label: "비밀번호", name: "password", type: "password" },
          { label: "비밀번호 확인", name: "passwordcheck", type: "password" },
        ]}
        submitLabel="회원가입"
        footerLabel="로그인하기"
        footerTo="/sign-in"
        onSubmit={(e) => {
          const formData = parseFormData(e.currentTarget);
          const signUpForm: SignUpForm = {
            accountId: formData["accountId"] as string,
            password: formData["password"] as string,
            passwordcheck: formData["passwordcheck"] as string,
          };

          signUp(signUpForm);
        }}
      />
    </Page>
  );
};

export default SignUpPage;
