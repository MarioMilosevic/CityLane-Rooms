import { parseISO } from "date-fns";
import { differenceInDays } from "date-fns";
export const getRoomImagePath = (imageUrl: string) => {
  const imagePath = imageUrl.split(
    "/storage/v1/object/public/roomsStorage/"
  )[1];
  return imagePath;
};

export const formatPrice = (number: number): string =>
  new Intl.NumberFormat("en-US", {minimumFractionDigits:2, maximumFractionDigits:2}).format(number);

export const subtractDates = (dateStr1:string, dateStr2:string) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));