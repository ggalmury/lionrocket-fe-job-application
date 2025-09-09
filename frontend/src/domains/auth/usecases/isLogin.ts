import loginStatusRepository from "@/domains/auth/repositories/loginStatusRepository";

const isLogin = async (): Promise<boolean> => {
  try {
    await loginStatusRepository();

    return true;
  } catch {
    return false;
  }
};

export default isLogin;
