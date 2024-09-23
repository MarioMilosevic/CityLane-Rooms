import FormBlock from "./FormBlock";
import Label from "../common/Label";
import Input from "../common/Input";
import ButtonWrapper from "./ButtonWrapper";
import PrimaryActionButton from "../common/PrimaryActionButton";
import {
  updateUserDataFormValues,
  updateUserDataSchema,
} from "src/validation/updateUserData";
import { useForm, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabaseUrl } from "src/utils/constants";
import { updateUserEmail, updateUserMetadata } from "src/api/AccountApi";
import { uploadImage } from "src/api/RoomsApi";
import { nanoid } from "nanoid";

const UpdateUserForm = () => {
  const form = useForm<updateUserDataFormValues>({
    defaultValues: {
      emailAddress: "",
      fullName: "",
      image: undefined,
    },
    resolver: zodResolver(updateUserDataSchema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmit = async (formData: updateUserDataFormValues) => {
    console.log(formData);
    const { emailAddress, fullName, image } = formData;
    // ovo ispod je objekat koji sam uzeo iz liste
    const imageObj = image[0]
    const imageUrl = await uploadImage(imageObj as File, 'userStorage');
  
      const emailResponse = await updateUserEmail(emailAddress);
      const metadataResonse = await updateUserMetadata(fullName, imageUrl)
      console.log(metadataResonse)
      console.log(emailResponse);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl py-4">Update user data</h2>

      <FormBlock size="small" direction="row">
        <Label id="Email address" />
        <Input
          id="Email address"
          type="email"
          zod={{ ...register("emailAddress") }}
          error={errors.emailAddress}
        />
      </FormBlock>
      <FormBlock size="small" direction="row">
        <Label id="Full name" />
        <Input
          id="Full name"
          type="text"
          zod={{ ...register("fullName") }}
          error={errors.fullName}
        />
      </FormBlock>
      <FormBlock size="small" direction="row">
        <Label id="Avatar image" />
        <Input
          id="Avatar image"
          type="file"
          zod={{ ...register("image") }}
          error={errors.image as FieldError}
        />
      </FormBlock>
      <ButtonWrapper justify="end">
        <PrimaryActionButton
          text="Cancel"
          color="white"
          clickHandler={() => reset()}
        />
        <PrimaryActionButton
          text="Update account"
          color="yellow"
          type="submit"
        />
      </ButtonWrapper>
    </form>
  );
};

export default UpdateUserForm;
