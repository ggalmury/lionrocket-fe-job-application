import { format } from "date-fns-tz";

export const formatDateToYMDHM = (date: Date, timeZone: string = "Asia/Seoul"): string => {
  return format(date, "yyyy-MM-dd HH:mm", { timeZone });
};
