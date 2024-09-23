import supabase from "src/config/supabaseClient";
import { UserType } from "src/types/types";
import { showToast } from "src/utils/toast";

export const createNewUser = async (user: UserType) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: user.emailAddress,
      password: user.password,
      options: {
        data: {
          fullName: user.fullName,
          image: user.image,
        },
      },
    });
    if (error) {
      showToast("Error occured when signing up", "error");
      console.error("Error occured when signing up", error);
      return;
    }
    return data;
  } catch (error) {
    showToast("Unexpected error occured, please try again", "error");
    console.error(error);
  }
};
