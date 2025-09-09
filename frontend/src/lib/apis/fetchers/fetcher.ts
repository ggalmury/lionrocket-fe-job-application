import type { ErrorMessage } from "@/lib/apis/types/errorMessage";
import { getAccessTokenFromLocalStorage } from "@/lib/storages/accessToken";
import UnauthorizedError from "@/lib/errors/http/unauthorizedError";
import HttpErrorFactory from "@/lib/errors/http/httpErrorFactory";
import HttpError from "@/lib/errors/http/httpError";
import InternalServerError from "@/lib/errors/http/internalServerError";

interface FetcherOptions {
  url: string;
  options?: RequestInit;
  needAuth?: boolean;
  errorMessage?: ErrorMessage;
}

const fetcher = async <T = unknown>({ url, options = {}, needAuth, errorMessage }: FetcherOptions): Promise<T> => {
  try {
    const headers = new Headers(options.headers);

    if (needAuth) {
      const token = getAccessTokenFromLocalStorage();
      if (!token) {
        throw new UnauthorizedError();
      }

      headers.set("Authorization", `Bearer ${token}`);
    }

    const requestOptions: RequestInit = {
      ...options,
      headers,
    };

    const response: Response = await fetch(url, requestOptions);
    if (!response.ok) {
      const statusCode = response.status;
      const message = errorMessage?.[statusCode];

      throw HttpErrorFactory.create(statusCode, message);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  } catch (e) {
    if (e instanceof HttpError) {
      throw e;
    }

    throw new InternalServerError();
  }
};

export default fetcher;
