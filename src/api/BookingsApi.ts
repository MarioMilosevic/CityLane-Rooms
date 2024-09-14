import supabase from "src/config/supabaseClient";

// export const fetchBookings = async () => {
//   try {
//     const { data, error } = await supabase
//       .from("Bookings")
//       .select(
//         `
//         *,
//         Guests(*)
//       `
//       )
//       .order("startDate", { ascending: true })
//       .limit(10);

//     if (error || !data) {
//       throw error || new Error("No data received");
//     }
//     console.log("data: ", data);

//     return data;
//   } catch (error) {
//     console.error("Error fetching bookings", error);
//     throw error;
//   }
// };

// export const filterBookings = async (status: string, sort:string) => {
//   /**
//    * upcoming first
//    * past first
//    * amount high first
//    * amount low first
//    */
//   console.log(sort);
//   try {
//     let query = supabase.from("Bookings").select(`*, Guests(*)`).limit(10);

//     if (status !== "All") {
//       query = query.eq("status", status);
//     }

//     if (sort === "upcoming first") {
//       query = query.order("startDate", { ascending: false });
//     } else if (sort === "past first") {
//       query = query.order("startDate", { ascending: true });
//     } else if (sort === "amount high first") {
//       query = query.order("totalPrice", { ascending: true });
//     } else if (sort === "amount low first") {
//       query = query.order("totalPrice", { ascending: false });
//     }

//     const { data, error } = await query;
//     console.log(data)

//     if (error) {
//       console.error("Error fetching data", error);
//       return;
//     }
//     // else {
//     //   return data;
//     // }
//   } catch (error) {
//     console.error(error);
//   }
// };
export const filterBookings = async (status: string, sort: string) => {
  /**
   * upcoming first
   * past first
   * amount high first
   * amount low first
   */
  console.log(sort);
  try {
    let query = supabase.from("Bookings").select(`*, Guests(*)`).limit(10);

    // Apply status filter if not 'All'
    if (status !== "All") {
      query = query.eq("status", status);
    }

    // Apply sorting based on 'sort' parameter
    if (sort === "date (upcoming first)") {
      console.log('uslo upcoming first')
      query = query.order("startDate", { ascending: false });
    } else if (sort === "date (past first)") {
      console.log('uslo past first')
      query = query.order("startDate", { ascending: true });
    } else if (sort === "amount (high first)") {
      query = query.order("totalPrice", { ascending: false }); 
      console.log('uslo amount high first')
    } else if (sort === "amount (low first)") {
      query = query.order("totalPrice", { ascending: true }); 
      console.log('uslo amount low first')
    }

    const { data, error } = await query;
    console.log(data);

    if (error) {
      console.error("Error fetching data", error);
      return;
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

