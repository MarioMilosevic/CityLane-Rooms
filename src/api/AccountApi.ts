import supabase from "src/config/supabaseClient";

export const updateUserPassword = async (password: string) => {
  console.log("iz apija",password)
  try {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    if (error) {
      console.error("Unable to update password", error);
      return;
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};
