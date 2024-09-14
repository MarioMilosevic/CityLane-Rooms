import supabase from "src/config/supabaseClient";
import { isFuture, isPast, isToday } from "date-fns";
import { subtractDates } from "src/utils/helpers";
import { rooms } from "src/data/data-rooms";
import { bookings } from "src/data/data-bookings";
import { guests } from "src/data/data-guests";
import { showToast } from "src/utils/toast";

export const deleteGuests = async () => {
  try {
    const { error } = await supabase.from("Guests").delete().gt("id", 0);
    if (error) console.log(error.message);
  } catch (error) {
    console.error(error);
  }
};

export const deleteRooms = async () => {
  try {
    const { error } = await supabase.from("Rooms").delete().gt("id", 0);
    if (error) console.log(error.message);
  } catch (error) {
    console.error(error);
  }
};

export const deleteBookings = async () => {
  try {
    const { error } = await supabase.from("Bookings").delete().gt("id", 0);
    if (error) console.log(error.message);
  } catch (error) {
    console.error(error);
  }
};

export const createGuests = async () => {
  try {
    const { error } = await supabase.from("Guests").insert(guests);
    if (error) console.log(error.message);
  } catch (error) {
    console.error(error);
  }
};

export const createRooms = async () => {
  try {
    const { error } = await supabase.from("Rooms").insert(rooms);
    if (error) console.log(error.message);
  } catch (error) {
    console.error(error);
  }
};

export const createBookings = async () => {
  try {
    const { data: guestsIds } = await supabase
      .from("Guests")
      .select("id")
      .order("id");

    const allGuestIds = guestsIds?.map((guest) => guest.id);

    const { data: roomsIds } = await supabase
      .from("Rooms")
      .select("id")
      .order("id");
    const allroomIds = roomsIds?.map((room) => room.id);

    const finalBookings = bookings.map((booking) => {
      const room = rooms.at(booking.roomId - 1);
      if (!room) return;
      const numNights = subtractDates(booking.endDate, booking.startDate);
      const roomPrice = numNights * (room.regularPrice - room.discount);
      const extrasPrice = booking.hasBreakfast
        ? numNights * 10 * booking.numGuests
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
        roomId: allroomIds?.at(booking.roomId - 1),
        status,
      };
    });

    const { error } = await supabase.from("Bookings").insert(finalBookings);
    if (error) console.error(error.message);
  } catch (error) {
    console.error(error);
    showToast('Unexpected error occured, try again', 'error')
  }
};

export const uploadAll = async () => {
  try {
    await deleteBookings();
    await deleteGuests();
    await deleteRooms();
    await createGuests();
    await createRooms();
    await createBookings();
  } catch (error) {
    console.error(error);
  }
};

export const uploadBookings = async () => {
  try {
    await deleteBookings();
    await createBookings();
  } catch (error) {
    console.error(error);
  }
};
