import HeaderContainer from "../components/layout/HeadingContainer";
import ContentWrapper from "../components/layout/ContentWrapper";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import FormBlock from "../components/layout/FormBlock";
import Label from "../components/layout/Label";
import Input from "../components/layout/Input";
import PrimaryActionButtonWrapper from "../components/layout/PrimaryActionButtonWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UserType } from "../types/types";
import { newUserSchema } from "../validation/newUserSchema";
const Users = () => {
  const [user, setUser] = useState<UserType>();

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
    formState: { errors, isDirty },
  } = form;

  const onSubmit = async () => {
    console.log("submit");
  };

  return (
    <>
      <HeaderContainer title={"Create a new user"} />
      <ContentWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormBlock>
            <Label id="Full name" />
            <Input
              id="Full name"
              type="text"
              zod={{ ...register("fullName") }}
              error={errors.fullName}
            />
          </FormBlock>
          <FormBlock>
            <Label id="Email address" />
            <Input
              id="Email address"
              type="email"
              zod={{ ...register("emailAddress") }}
              error={errors.emailAddress}
            />
          </FormBlock>
          <FormBlock>
            <Label id="Password" />
            <Input
              id="Password"
              type="password"
              zod={{ ...register("password") }}
              error={errors.password}
            />
          </FormBlock>
          <FormBlock>
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
              clickHandler={() => console.log("kasnije")}
              color="white"
            />
            <PrimaryActionButton
              text="Create new user"
              type="submit"
              color="blue"
            />
          </PrimaryActionButtonWrapper>
        </form>
      </ContentWrapper>
    </>
  );
};

export default Users;
