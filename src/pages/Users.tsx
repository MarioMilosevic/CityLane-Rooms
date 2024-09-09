import HeaderContainer from "../components/layout/HeadingContainer";
import ContentWrapper from "../components/layout/ContentWrapper";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import FormBlock from "../components/layout/FormBlock";
import Label from "../components/layout/Label";
import Input from "../components/layout/Input";
import PrimaryActionButtonWrapper from "../components/layout/PrimaryActionButtonWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewUser } from "src/features/users/services/UsersApi";
import { newUserSchema, userFormValues } from "src/features/users/validation/newUserSchema";
const Users = () => {
  const form = useForm({
    defaultValues: {
      fullName: "",
      emailAddress: "",
      password: "",
      repeatPassword: "",
    },
    resolver: zodResolver(newUserSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmit = async (formData: userFormValues) => {
    try {
      const { repeatPassword, ...correctFormData } = formData;
      const response = await createNewUser(correctFormData);
      console.log(response)
    } catch (error) {
      console.error("Error creating new user: ", error);
    }

    reset();
  };


  return (
    <>
      <HeaderContainer title={"Create a new user"} />
      <ContentWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormBlock size="big" direction="row">
            <Label id="Full name" />
            <Input
              id="Full name"
              type="text"
              zod={{ ...register("fullName") }}
              error={errors.fullName}
            />
          </FormBlock>
          <FormBlock size="big" direction="row">
            <Label id="Email address" />
            <Input
              id="Email address"
              type="email"
              zod={{ ...register("emailAddress") }}
              error={errors.emailAddress}
            />
          </FormBlock>
          <FormBlock size="big" direction="row">
            <Label id="Password" />
            <Input
              id="Password"
              type="password"
              zod={{ ...register("password") }}
              error={errors.password}
            />
          </FormBlock>
          <FormBlock size="big" direction="row">
            <Label id="Repeat password" />
            <Input
              id="Repeat password"
              type="password"
              zod={{ ...register("repeatPassword") }}
              error={errors.repeatPassword}
            />
          </FormBlock>
          <PrimaryActionButtonWrapper>
            <PrimaryActionButton
              text="Cancel"
              clickHandler={() => reset()}
              color="white"
            />
            <PrimaryActionButton
              text="Create new user"
              type="submit"
              color="yellow"
            />
          </PrimaryActionButtonWrapper>
        </form>
      </ContentWrapper>
    </>
  );
};

export default Users;
