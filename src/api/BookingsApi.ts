import supabase from "src/config/supabaseClient";
import { itemsPerPage } from "src/utils/constants";
import { BookingType } from "src/types/types";

export const fetchBookings = async (
  filter: string,
  sort: string,
  page: number
): Promise<{ data: BookingType[]; count: number }> => {
  try {
    const from = (page - 1) * itemsPerPage; // 0, 10, 20
    const to = from + itemsPerPage - 1; // 9 , 19, 29

    let query = supabase
      .from("Bookings")
      .select(`*, Guests(*)`, { count: "exact" })
      .range(from, to);

    if (filter !== "All") {
      query = query.eq("status", filter);
    }

    if (sort === "date (upcoming first)") {
      query = query.order("startDate", { ascending: false });
    } else if (sort === "date (past first)") {
      query = query.order("startDate", { ascending: true });
    } else if (sort === "amount (high first)") {
      query = query.order("totalPrice", { ascending: false });
    } else if (sort === "amount (low first)") {
      query = query.order("totalPrice", { ascending: true });
    }

    const { data, count, error } = await query;

    if (error) {
      console.error("Error fetching bookings", error);
      return { data: [], count: 0 };
    }

    return { data: data || [], count: count ?? 0 };
  } catch (error) {
    console.error("Error fetching bookings", error);
    return { data: [], count: 0 };
  }
};

export const fetchSingleBooking = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from("Bookings")
      .select(
        `
        *,
        Guests!guestId(*)       `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error occurred:", error);
    return null;
  }
};

export const deleteBooking = async (bookingId: number, guestId: number) => {
  try {
    const deleteBookingPromise = supabase
      .from("Bookings")
      .delete()
      .eq("id", bookingId);

    const deleteGuestPromise = supabase
      .from("Guests")
      .delete()
      .eq("id", guestId);

    const [deleteBookingResult, deleteGuestResult] = await Promise.all([
      deleteBookingPromise,
      deleteGuestPromise,
    ]);

    if (deleteBookingResult.error) throw deleteBookingResult.error;
    if (deleteGuestResult.error) throw deleteGuestResult.error;

    console.log("Booking and associated guest deleted successfully.");
  } catch (error) {
    console.error("Error occurred while deleting booking and guest:", error);
  }
};
