import { isFuture, isPast, isToday } from "date-fns";
import supabase from "src/config/supabaseClient";
import PrimaryActionButton from "src/components/common/PrimaryActionButton";

import { subtractDates } from "../utils/helpers";
import { rooms } from "./data-rooms";
import { bookings } from "./data-bookings";
import { guests } from "./data-guests";


async function deleteGuests() {
  const { error } = await supabase.from("Guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteRooms() {
  const { error } = await supabase.from("Rooms").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("Bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("Guests").insert(guests);
  if (error) console.log(error.message);
}

async function createRooms() {
  const { error } = await supabase.from("Rooms").insert(rooms);
  if (error) console.log(error.message);
}

async function createBookings() {
  const { data: guestsIds } = await supabase
    .from("Guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((room) => room.id);
  const { data: roomsIds } = await supabase
    .from("Rooms")
    .select("id")
    .order("id");
    const allroomIds = roomsIds.map((room) => room.id);
    console.log(allroomIds)

  const finalBookings = bookings.map((booking) => {
    const room = rooms.at(booking.roomId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const roomPrice = numNights * (room.regularPrice - room.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0;
    const totalPrice = roomPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      roomPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      roomId: allroomIds.at(booking.roomId - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("Bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  async function uploadAll() {
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteRooms();

    // Bookings need to be created LAST
    await createGuests();
    await createRooms();
    await createBookings();
  }

  async function uploadBookings() {
    await deleteBookings();
    await createBookings();
  }

  return (
    <div className="p-4 text-center flex flex-col gap-4">
      <h3>SAMPLE DATA</h3>
      <PrimaryActionButton
        color="yellow"
        text="Upload ALL"
        clickHandler={uploadAll}
      />
      <PrimaryActionButton
        color="yellow"
        text="Upload bookings ONLY"
        clickHandler={uploadBookings}
      />
      <PrimaryActionButton
        color="yellow"
        text="Create rooms"
        clickHandler={createRooms}
      />
    </div>
  );
}

export default Uploader;
