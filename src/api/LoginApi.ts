import supabase from "src/config/supabaseClient";
import { showToast } from "src/utils/toast";
import { loginUserFormValues } from "../validation/loginUserSchema";

export const loginUser = async (form: loginUserFormValues) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (error) {
      showToast("Invalid credentials", "error");
      throw Error('Invalid credentials')
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      showToast('Error retrieving session', 'error')
      return error
    }
    return {session:data.session}
  } catch (error) {
    showToast("Unexpected error occured please try again", 'error')
    console.error("Error occured when trying to retrieve session",error)
  }
}
 