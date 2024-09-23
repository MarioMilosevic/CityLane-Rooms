import supabase from "src/config/supabaseClient";

export const updateUserPassword = async (password: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    if (error) {
      console.error("Unable to update password", error);
      return;
    }
    return data;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};

export const retrieveUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      console.error("Error retrieving user", error);
    }
    return user;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};

export const updateUserEmail = async (newEmail: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      console.error("Unable to update email", error);
      return;
    }
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};

export const updateUserMetadata = async (fullName: string, image: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: { fullName: fullName, image: image },
    });
    if (error) {
      console.error("Unable to update user name");
      return;
    }
    return data
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};
