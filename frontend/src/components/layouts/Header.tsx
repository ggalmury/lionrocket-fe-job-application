import { Link, useNavigate } from "react-router-dom";

import PrimaryButton from "@/components/atoms/button/PrimaryButton";
import TertiaryButton from "@/components/atoms/button/TertiaryButton";
import ThemeButton from "@/components/atoms/button/ThemeButton";
import Body1 from "@/components/atoms/typography/Body1";

const Header = () => {
  const navigate = useNavigate();

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
          <TertiaryButton label="로그인" styles={{ height: "h-10" }} onClick={() => navigate("/sign-in")} />

          <PrimaryButton label="회원가입" styles={{ height: "h-10" }} onClick={() => navigate("/sign-up")} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
