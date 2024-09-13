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


export const filterBookings = async (status:string) => {
 try {
   const { data, error } = await supabase.from('Bookings').select().eq('status', status)
   if (error) {
     console.log('Nije dosao data', error)
     return
   } else {
     console.log("Dosao data",data)
   }
 } catch (error) {
   console.error(error)
 } 
}