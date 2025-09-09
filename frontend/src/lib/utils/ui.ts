import { toast } from "react-toastify";
import { ZodError } from "zod";

export const toastError = (error: unknown): void => {
  let message: string = "알 수 없는 에러가 발생했어요.";

  if (error instanceof ZodError) {
    message = error.issues[0]?.message ?? "입력값이 유효하지 않아요.";
  } else if (error instanceof Error) {
    message = error.message;
  }

  toast.error(message);
};
