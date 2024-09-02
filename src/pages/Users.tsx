import HeaderContainer from "../components/layout/HeadingContainer";
import ContentWrapper from "../components/layout/ContentWrapper";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import FormBlock from "../components/layout/FormBlock";
import Label from "../components/layout/Label";
import Input from "../components/layout/Input";
import { usersFormFields } from "../utils/constants";
import PrimaryActionButtonWrapper from "../components/layout/PrimaryActionButtonWrapper";
const Users = () => {
  return (
    <>
      <HeaderContainer  title={"Create a new user"} />
      <ContentWrapper>
        {usersFormFields.map((user, index) => (
          <FormBlock key={index}>
            <Label id={user.name} />
            <Input id={user.name} type={user.type}  />
          </FormBlock>
        ))}
        <PrimaryActionButtonWrapper>
          <PrimaryActionButton
            text="Cancel"
            clickHandler={() => console.log("kasnije")}
            color="white"
          />
          <PrimaryActionButton
            text="Create new user"
            clickHandler={() => console.log("kasnije")}
            color="blue"
          />
        </PrimaryActionButtonWrapper>
      </ContentWrapper>
    </>
  );
};

export default Users;
