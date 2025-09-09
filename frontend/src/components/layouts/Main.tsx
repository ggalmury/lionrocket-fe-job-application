import { Navigate, Route, Routes } from "react-router-dom";

import RequireAuthPage from "@/components/layouts/RequireAuthPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import HomePage from "@/pages/HomePage";

const Main = () => {
  return (
    <main className="flex flex-1 min-h-0 overflow-hidden">
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        <Route element={<RequireAuthPage />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
};

export default Main;
