import supabase from "src/config/supabaseClient";

export const updateUserPassword = async (password: string) => {
  console.log("iz apija", password);
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

// NE ZNAM TREBA LI MI OVO ISPOD UOPSTE
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
    const { data, error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      console.error("Unable to update email", error);
      return;
    }
    return data;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};

export const updateUserMetadata = async (fullName: string, image:string) => {
  console.log(fullName)
  console.log("u funkciji imidz",image)
  try {
    // const newImageObj = image.image[0]
    const { data, error } = await supabase.auth.updateUser({
      data: { fullName: fullName, image:image },
    });
    if (error) {
      console.error("Unable to update user name");
      return;
    }
    return data;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }

    //  const newRoomName = newRoom.image[0] as File;
    //  const imageName = `${nanoid()}--${newRoomName.name}`;
    //  const imagePath = `${supabaseUrl}/storage/v1/object/public/roomsStorage/${imageName}`;

    //  const updateRoomQuery = supabase
    //    .from("Rooms")
    //    .update({
    //      ...newRoom,
    //      image: imagePath,
    //    })
    //    .eq("id", roomId)
    //    .select()
    //    .single();
};
