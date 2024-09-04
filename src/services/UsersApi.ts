import supabase from "../config/supabaseClient";
import { UserType } from "../types/types";
import { showToast } from "./toastNotification";

export const createNewUser = async (user: UserType) => {
  try {
    const { error } = await supabase.from("Use").insert(user);
    if (error) {
      showToast("Unexpected error occured, please try again", "error");
      return error;
    }
    showToast("User created succesfully", "success");
  } catch (error) {
    console.error("Error creating user: ", error);
  }
};
