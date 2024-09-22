import FormBlock from "src/components/layout/FormBlock";
import HeadingContainer from "src/components/layout/HeadingContainer";
import Label from "src/components/common/Label";
import Input from "src/components/common/Input";
import ButtonWrapper from "src/components/layout/ButtonWrapper";
import PrimaryActionButton from "src/components/common/PrimaryActionButton";
const Account = () => {
  return (
    <div>
      <HeadingContainer title="Update your account" />
      <h2 className="text-xl py-4">Update user data</h2>
      <FormBlock size="small" direction="row">
        <Label id="Email address" />
        <Input id="Email address" type="email" />
      </FormBlock>
      <FormBlock size="small" direction="row">
        <Label id="Full name" />
        <Input id="Full name" type="email" />
      </FormBlock>
      <FormBlock size="small" direction="row">
        <Label id="Avatar image" />
        <Input
          id="Avatar image"
          type="file"
          //   zod={{ ...register("image") }}
          //   error={errors.image as FieldError}
        />
      </FormBlock>
      <ButtonWrapper justify="end">
        <PrimaryActionButton text="Cancel" color="white" />
        <PrimaryActionButton text="Update account" color="yellow" />
      </ButtonWrapper>

      <h2 className="text-xl py-4">Update password</h2>
      <FormBlock size="small" direction="row">
        <Label id="New password (min 8 chars)" />
        <Input id="New password (min 8 chars)" type="password" />
      </FormBlock>
      <FormBlock size="small" direction="row">
        <Label id="Confirm password" />
        <Input id="Confirm password" type="password" />
      </FormBlock>
      <ButtonWrapper justify="end">
        <PrimaryActionButton text="Cancel" color="white" />
        <PrimaryActionButton text="Update password" color="yellow" />
      </ButtonWrapper>
    </div>
  );
};

export default Account;
