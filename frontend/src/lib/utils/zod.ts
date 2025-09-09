import { z, ZodType } from "zod";

export const validateOrThrow = <T extends ZodType>(schema: T, data: unknown): z.output<T> => {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    throw parsed.error;
  }

  return parsed.data;
};
