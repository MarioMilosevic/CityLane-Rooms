import supabase from "src/config/supabaseClient";

export const fetchBookings = async () => {
  try {
    const { data, error } = await supabase
      .from("Bookings")
      .select("*")
      .order("startDate", { ascending: true });

    if (error || !data) {
      throw error || new Error("No data received");
    }
    return data;
  } catch (error) {
    console.error("Error fetching settings", error);
    throw Error;
  }
};
