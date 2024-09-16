import supabase from "src/config/supabaseClient";
import { itemsPerPage } from "src/utils/constants";
import { BookingType } from "src/types/types";

export const fetchBookings = async (
  filter: string,
  sort: string,
  page: number
): Promise<{ data: BookingType[]; count: number }> => {
  try {
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

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

