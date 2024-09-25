import HeaderContainer from "../components/layout/HeadingContainer";
import ContentWrapper from "../components/layout/ContentWrapper";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import FormBlock from "../components/layout/FormBlock";
import Label from "../components/common/Label";
import Input from "../components/common/Input";
import ButtonWrapper from "../components/layout/ButtonWrapper";
import { useForm, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewUser } from "src/api/UsersApi";
import { newUserSchema, userFormValues } from "src/validation/newUserSchema";
import { uploadImage } from "src/utils/helpers";
import { showToast } from "src/utils/toast";
import { useState } from "react";
const Users = () => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const form = useForm({
    defaultValues: {
      fullName: "",
      emailAddress: "",
      password: "",
      repeatPassword: "",
      userImage: "",
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
      setIsButtonLoading(true);
      const { emailAddress, fullName, password, userImage } = formData;
      const imageFile = userImage[0];
      const imageUrl = await uploadImage(imageFile as File, "userStorage");
      const correctFormData = {
        emailAddress,
        fullName,
        password,
        image: imageUrl,
      };
      const response = await createNewUser(correctFormData);
      if (response?.user?.id) {
        showToast("User sucessfully created");
      }
    } catch (error) {
      console.error("Error creating new user: ", error);
    } finally {
      setIsButtonLoading(false);
      reset();
    }
  };

  return (
    <>
      <HeaderContainer title={"Create a new user"} />
      <ContentWrapper>
        <form onSubmit={handleSubmit(onSubmit)} className="pt-8">
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
            <Label id="Email address" />
            <Input
              id="Email address"
              type="email"
              zod={{ ...register("emailAddress") }}
              error={errors.emailAddress}
            />
          </FormBlock>
          <FormBlock size="small" direction="row">
            <Label id="Password" />
            <Input
              id="Password"
              type="password"
              zod={{ ...register("password") }}
              error={errors.password}
            />
          </FormBlock>
          <FormBlock size="small" direction="row">
            <Label id="Repeat password" />
            <Input
              id="Repeat password"
              type="password"
              zod={{ ...register("repeatPassword") }}
              error={errors.repeatPassword}
            />
          </FormBlock>
          <FormBlock size="small" direction="row">
            <Label id="User image" />
            <Input
              id="User image"
              type="file"
              zod={{ ...register("userImage") }}
              error={errors.userImage as FieldError}
            />
          </FormBlock>
          <ButtonWrapper justify="end">
            <PrimaryActionButton
              text="Cancel"
              clickHandler={() => reset()}
              color="white"
            />
            <PrimaryActionButton
              text="Create new user"
              type="submit"
              color="yellow"
              isLoading={isButtonLoading}
            />
          </ButtonWrapper>
        </form>
      </ContentWrapper>
    </>
  );
};

export default Users;
