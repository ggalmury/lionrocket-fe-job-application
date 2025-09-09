import { Navigate, Outlet } from "react-router-dom";

import useIsLogin from "@/domains/auth/hooks/useIsLogin";

const RequireAuthPage = () => {
  const { data: isLogin, isLoading } = useIsLogin();

  if (isLoading) {
    return <div></div>;
  }

  if (!isLogin) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default RequireAuthPage;
