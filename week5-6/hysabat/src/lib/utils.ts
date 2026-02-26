import { clsx, type ClassValue } from "clsx"
import { formatInTimeZone } from "date-fns-tz";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const payloadDate = (date: Date) => formatInTimeZone(
  date,
  "Etc/GMT-3",
  "yyyy-MM-dd'T'HH:mm:ssXXX"
);