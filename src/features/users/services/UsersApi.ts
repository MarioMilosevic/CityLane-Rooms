import supabase from "src/config/supabaseClient";
import { UserType } from "src/types/types";
import { showToast } from "src/utils/toast";

export const createNewUser = async (user: UserType) => {
  try {
    const { error } = await supabase.from("Users").insert(user);
    if (error) {
      showToast("Unexpected error occured, please try again", "error");
      return error;
    }
    showToast("User created succesfully", "success");
  } catch (error) {
    console.error("Error creating user: ", error);
  }
};
