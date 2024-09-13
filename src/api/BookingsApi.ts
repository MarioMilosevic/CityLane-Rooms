import supabase from "src/config/supabaseClient";

export const fetchBookings = async () => {
  try {
    const { data, error } = await supabase
      .from("Bookings")
      .select(
        `
        *,
        Guests(*)
      `
      )
      .order("startDate", { ascending: true })
      .limit(10);

    if (error || !data) {
      throw error || new Error("No data received");
    }
    console.log("data: ", data);

    return data;
  } catch (error) {
    console.error("Error fetching bookings", error);
    throw error;
  }
};
