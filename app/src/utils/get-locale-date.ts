import { getLocalTimeZone, parseDate } from "@internationalized/date";

export const getLocaleDate = (date: string) => {
    const parsedDate = parseDate(date);
    return parsedDate.toDate(getLocalTimeZone()).toLocaleDateString();
}