import supabase from "../config/supabaseClient";

export const loginUser = async (form) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (error) {
      console.log(error);
      return error;
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error occured", error);
  }
};
