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

export const filterBookings = async (status: string) => {
  try {
    let query = supabase.from("Bookings").select(`*, Guests(*)`).limit(10);

    // Only apply the status filter if the status is not "All"
    if (status !== "All") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      console.log("Error fetching data", error);
      return;
    } else {
      // console.log("Fetched data", data);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};
