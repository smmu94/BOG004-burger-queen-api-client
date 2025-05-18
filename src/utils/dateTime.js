import { format, formatDuration, intervalToDuration } from "date-fns";

export const getCurrentDate = () => format(new Date(), "yyyy-MM-dd HH:mm:ss");

export function calculatePreparationTime(dataEntry) {
  const dateProcessed = getCurrentDate();

  const duration = intervalToDuration({
    start: new Date(dataEntry),
    end: new Date(dateProcessed),
  });

  const formattedTime = formatDuration(duration, {
    format: ["hours", "minutes", "seconds"],
  });

  return { formattedTime, dateProcessed };
}
