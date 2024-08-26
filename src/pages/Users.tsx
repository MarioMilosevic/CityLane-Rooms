import HeaderContainer from "../components/layout/HeadingContainer";
import ContentWrapper from "../components/layout/ContentWrapper";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import FormBlock from "../components/layout/FormBlock";
import Label from "../components/layout/Label";
import Input from "../components/layout/Input";
import { usersFormFields } from "../utils/constants";
const Users = () => {
  return (
    <>
      <HeaderContainer isVisible={false} title={"Create a new user"} />
      <ContentWrapper>
        {usersFormFields.map((user, index) => (
          <FormBlock key={index}>
            <Label name={user.name} />
            <Input name={user.name} type={user.type} value="" />
          </FormBlock>
        ))}
        <div className="w-full flex justify-end gap-4 pr-4 py-4">
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
        </div>
      </ContentWrapper>
    </>
  );
};

export default Users;
