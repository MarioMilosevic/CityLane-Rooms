import { formatDistance, parseISO } from "date-fns";
import { differenceInDays, format } from "date-fns";
export const getRoomImagePath = (imageUrl: string) => {
  const imagePath = imageUrl.split(
    "/storage/v1/object/public/roomsStorage/"
  )[1];
  return imagePath;
};

export const formatPrice = (number: number): string =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

export const subtractDates = (dateStr1: string, dateStr2: string) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDate = (date: string) => {
  const formattedDate = format(new Date(date), "MMM dd yyyy");
  return formattedDate;
};

export const timeDifference = (date: string) => {
  const currentDate = new Date();
  const time = formatDistance(parseISO(date), currentDate);
  return time;
};

export const formatDay = (date: string) => {
  const formattedDay = format(date, "EEEE").slice(0, 3);
  return formattedDay;
};

