import { deleteAccessTokenFromLocalStorage } from "@/lib/storages/accessToken";

const signOut = async (): Promise<void> => {
  deleteAccessTokenFromLocalStorage();
};

export default signOut;
