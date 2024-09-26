import supabase from "src/config/supabaseClient";
import { rooms, RoomsDataType } from "src/data/rooms";
import { bookings } from "src/data/bookings";
import { guests, GuestsDataType } from "src/data/guests";
import { showToast } from "src/utils/toast";
import { nanoid } from "nanoid";
import { formatDistance, parseISO, isFuture, isPast, isToday } from "date-fns";
import { differenceInDays, format } from "date-fns";

const pricePerBreakfast = 10;

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

export const uploadImage = async (file: File, storage: string) => {
  const fileName = `${nanoid()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from(storage)
    .upload(`${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (data) {
    const { data: publicURL } = supabase.storage
      .from(storage)
      .getPublicUrl(`${fileName}`);

    return publicURL.publicUrl;
  } else {
    console.error("Error uploading file: ", error.message);
    return null;
  }
};

export const deleteTable = async (tableName: string) => {
  try {
    const { error } = await supabase.from(tableName).delete().gt("id", 0);
    if (error) console.error(error.message);
  } catch (error) {
    console.error(error);
  }
};

export const createTable = async (
  tableName: string,
  data: GuestsDataType | RoomsDataType
) => {
  try {
    const { error } = await supabase.from(tableName).insert(data);
    if (error) console.error(error.message);
  } catch (error) {
    console.error(error);
  }
};

export const createBookings = async () => {
  try {
    const [guestsResult, roomsResult] = await Promise.all([
      supabase.from("Guests").select("id").order("id"),
      supabase.from("Rooms").select("id").order("id"),
    ]);

    const allGuestIds = guestsResult.data?.map((guest) => guest.id);
    const allRoomIds = roomsResult.data?.map((room) => room.id);

    const finalBookings = bookings.map((booking) => {
      const room = rooms.at(booking.roomId - 1);
      if (!room) return;
      const numNights = subtractDates(booking.endDate, booking.startDate);
      const roomPrice = numNights * (room.regularPrice - room.discount);
      const extrasPrice = booking.hasBreakfast
        ? numNights * pricePerBreakfast * booking.numGuests
        : 0;
      const totalPrice = roomPrice + extrasPrice;

      let status;
      if (
        isPast(new Date(booking.endDate)) &&
        !isToday(new Date(booking.endDate))
      )
        status = "Checked out";
      if (
        isFuture(new Date(booking.startDate)) ||
        isToday(new Date(booking.startDate))
      )
        status = "Unconfirmed";
      if (
        (isFuture(new Date(booking.endDate)) ||
          isToday(new Date(booking.endDate))) &&
        isPast(new Date(booking.startDate)) &&
        !isToday(new Date(booking.startDate))
      )
        status = "Checked in";

      return {
        ...booking,
        numNights,
        roomPrice,
        extrasPrice,
        totalPrice,
        guestId: allGuestIds?.at(booking.guestId - 1),
        roomId: allRoomIds?.at(booking.roomId - 1),
        status,
      };
    });

    const { error } = await supabase.from("Bookings").insert(finalBookings);
    if (error) console.error(error.message);
  } catch (error) {
    console.error(error);
    showToast("Unexpected error occured, try again", "error");
  }
};

export const uploadAll = async () => {
  try {
    await deleteTable("Bookings");
    await deleteTable("Guests");
    await deleteTable("Rooms");
    await createTable("Guests", guests);
    await createTable("Rooms", rooms);
    await createBookings();
  } catch (error) {
    showToast("Unable to upload all files", "error");
    console.error(error);
  }
};

export const uploadBookings = async () => {
  try {
    await deleteTable("Bookings");
    await createBookings();
    window.location.reload()
  } catch (error) {
    showToast("Unable to upload bookings", "error");
    console.error(error);
  }
};
