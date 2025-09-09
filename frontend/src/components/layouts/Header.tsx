import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import useIsLogin from "@/domains/auth/hooks/useIsLogin";
import useSignOut from "@/domains/auth/hooks/useSignOut";

import PrimaryButton from "@/components/atoms/button/PrimaryButton";
import TertiaryButton from "@/components/atoms/button/TertiaryButton";
import ThemeButton from "@/components/atoms/button/ThemeButton";
import Body1 from "@/components/atoms/typography/Body1";

const Header = () => {
  const navigate = useNavigate();

  const { data: isLogin } = useIsLogin();
  const { mutate: signOut } = useSignOut({
    onSuccess: () => {
      toast.info("로그아웃 하였습니다.");
      navigate("/sign-in", { replace: true });
    },
  });

  return (
    <header className="border-b border-gray-400">
      <div className="flex justify-between items-center max-w-5xl h-14 mx-auto px-4">
        <div className="flex justify-center items-center gap-4">
          <Link to="/">
            <Body1 text="AI채팅 서비스" styles={{ weight: "font-bold" }} />
          </Link>
          <ThemeButton />
        </div>
        <nav className="flex items-center gap-2">
          {isLogin ? (
            <TertiaryButton label="로그아웃" styles={{ height: "h-10" }} onClick={signOut} />
          ) : (
            <>
              <TertiaryButton label="로그인" styles={{ height: "h-10" }} onClick={() => navigate("/sign-in")} />

              <PrimaryButton label="회원가입" styles={{ height: "h-10" }} onClick={() => navigate("/sign-up")} />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
