import supabase from "src/config/supabaseClient";
import { settingsFormValues } from "src/validation/settingsFormSchema";

export const fetchSettings = async () => {
  try {
    const { data, error } = await supabase.from("Settings").select().single();

    if (error || !data) {
      throw error || new Error("No data received");
    }
    return data;
  } catch (error) {
    console.error("Error fetching settings", error);
    throw Error;
  }
};

export const updateSettings = async (updatedSettings: settingsFormValues) => {
  try {
    const { data, error } = await supabase
      .from("Settings")
      .update(updatedSettings)
      .eq("id", 1)
      .select()
      .single();

    if (error) {
      return;
    }
    return data;
  } catch (error) {
    console.error("Error updating settings: ", error);
  }
};
