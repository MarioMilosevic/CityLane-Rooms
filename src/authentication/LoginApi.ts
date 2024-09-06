import supabase from "../config/supabaseClient";
import { showToast } from "../services/toastNotification";
import { loginUserFormValues } from "./loginUserSchema";

export const loginUser = async (form: loginUserFormValues) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (error) {
      showToast("Invalid credentials", "error");
      return error;
    }
    return data;
  } catch (error) {
    console.log("Error occured", error);
  }
};
