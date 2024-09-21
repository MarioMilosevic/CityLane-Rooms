import supabase from "src/config/supabaseClient";
import { SettingsType } from "src/types/types";
import { settingsFormValues } from "src/validation/settingsFormSchema";

export const fetchSettings = async (column: string = "*"): Promise<SettingsType | Partial<SettingsType>> => {
  try {
    const { data, error } = await supabase
      .from("Settings")
      .select(column)
      .single();

    if (error || !data) {
      throw error || new Error("No data received");
    }
    return data as SettingsType | Partial<SettingsType>;
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
