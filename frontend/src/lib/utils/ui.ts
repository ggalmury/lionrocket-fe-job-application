import { toast } from "react-toastify";
import { ZodError } from "zod";

export const toastError = (err: unknown): void => {
  let message: string = "알 수 없는 에러가 발생했어요.";

  if (err instanceof ZodError) {
    message = err.issues[0]?.message ?? "입력값이 유효하지 않아요.";
  } else if (err instanceof Error) {
    message = err.message;
  }

  toast.error(message);
};
