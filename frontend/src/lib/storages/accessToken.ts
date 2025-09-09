const key = "lionrocket:access-token";

export const getAccessTokenFromLocalStorage = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(key);
};

export const setAccessTokenToLocalStorage = (token: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(key, token);
};

export const deleteAccessTokenFromLocalStorage = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(key);
};
