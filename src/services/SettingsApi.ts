import supabase from "../config/supabaseClient";

export const fetchSettings = async () => {
  try {
    const { data, error } = await supabase.from("Settings").select().single();

    if (error || !data) {
      throw error || new Error("No data received");
      }
      return data
  } catch (error) {
    console.error("Error fetching settings", error);
    throw Error;
  }
};
