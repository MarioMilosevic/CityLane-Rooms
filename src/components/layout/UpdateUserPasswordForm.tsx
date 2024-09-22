import FormBlock from "./FormBlock";
import Label from "../common/Label";
import Input from "../common/Input";
import ButtonWrapper from "./ButtonWrapper";
import PrimaryActionButton from "../common/PrimaryActionButton";
import {
  updateUserPasswordSchema,
  updatePasswordFormValues,
} from "src/validation/updatePasswordSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const UpdateUserPasswordForm = () => {
  const form = useForm<updatePasswordFormValues>({
    defaultValues: {
      password: "",
      repeatPassword: "",
      },
      resolver:zodResolver(updateUserPasswordSchema)
  });

  const {
    register,
    handleSubmit,
      formState: { errors },

  } = form;

    const onSubmit = () => {
        console.log('submit')
    }
    
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl py-4">Update password</h2>
      <FormBlock size="small" direction="row">
        <Label id="New password (min 8 chars)" />
        <Input
          id="New password (min 8 chars)"
          type="password"
          zod={{ ...register("password") }}
          error={errors.password}
        />
      </FormBlock>
      <FormBlock size="small" direction="row">
        <Label id="Confirm password" />
        <Input
          id="Confirm password"
          type="password"
          zod={{ ...register("repeatPassword") }}
          error={errors.repeatPassword}
        />
      </FormBlock>
      <ButtonWrapper justify="end">
        <PrimaryActionButton text="Cancel" color="white" />
        <PrimaryActionButton text="Update password" color="yellow" />
      </ButtonWrapper>
    </form>
  );
};

export default UpdateUserPasswordForm;
