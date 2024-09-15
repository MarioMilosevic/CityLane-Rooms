import supabase from "src/config/supabaseClient";

// export const fetchBookings = async (filter: string, sort: string) => {
//   try {
//     let query = supabase.from("Bookings").select(`*, Guests(*)`).limit(10);

//     if (filter !== "All") {
//       query = query.eq("status", filter);
//     }

//     if (sort === "date (upcoming first)") {
//       query = query.order("startDate", { ascending: false });
//     } else if (sort === "date (past first)") {
//       query = query.order("startDate", { ascending: true });
//     } else if (sort === "amount (high first)") {
//       query = query.order("totalPrice", { ascending: false });
//     } else if (sort === "amount (low first)") {
//       query = query.order("totalPrice", { ascending: true });
//     }

//     const { data, error } = await query;

//     if (error) {
//       console.error("Error fetching data", error);
//       return;
//     }
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const fetchBookings = async (
  filter: string,
  sort: string,
  page: number
) => {
  try {
    const itemsPerPage = 10;
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
      .from("Bookings")
      .select(`*, Guests(*)`)
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

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching data", error);
      return;
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
