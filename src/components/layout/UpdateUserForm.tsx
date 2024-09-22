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
import { updateUserEmail } from "src/api/AccountApi";

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
    console.log("submit");
    console.log(formData);
    const { emailAddress } = formData;
    const emailResponse = await updateUserEmail(emailAddress);
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
