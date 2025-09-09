import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { parseFormData } from "@/lib/utils/parser/formdata";

import Page from "@/components/layouts/Page";
import AuthForm from "@/components/organisms/auth/AuthForm";
import useSignIn from "@/domains/auth/hooks/useSignIn";
import type { AccountForm } from "@/domains/auth/models/accountForm";

const SignInPage = () => {
  const navigate = useNavigate();

  const { mutate: signIn } = useSignIn({
    onSuccess: () => {
      toast.info("로그인이 완료되었어요.");
      navigate("/", { replace: true });
    },
  });

  return (
    <Page justifyCenter itemsCenter>
      <AuthForm
        title="로그인"
        subtitle="아이디와 비밀번호를 입력해 주세요"
        fields={[
          { label: "아이디", name: "accountId", placeholder: "example@gmail.com" },
          { label: "비밀번호", name: "password", type: "password" },
        ]}
        submitLabel="로그인"
        footerLabel="회원가입하기"
        footerTo="/sign-up"
        onSubmit={(e) => {
          const formData = parseFormData(e.currentTarget);
          const accountForm: AccountForm = {
            accountId: formData["accountId"] as string,
            password: formData["password"] as string,
          };

          signIn(accountForm);
        }}
      />
    </Page>
  );
};

export default SignInPage;
