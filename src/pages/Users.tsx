import HeaderContainer from "../components/layout/HeadingContainer";
import InputField from "../components/layout/InputField";
import TableContainer from "../components/layout/ContentWrapper";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
const Users = () => {
  return (
    <>
      <HeaderContainer isVisible={false} title={"Create a new user"} />
      <TableContainer>
          <InputField type="text" name="Full name"/>
          <InputField type="email" name="Email address"/>
          <InputField type="password" name="Password (min 8 characters)"/>
          <InputField type="password" name="Repeat password"/>
      </TableContainer>
      <div className="w-full flex justify-end gap-4 pr-4">
        <PrimaryActionButton  text="Cancel" clickHandler={() => console.log('kasnije')} color="white"/>
        <PrimaryActionButton  text="Create new user" clickHandler={() => console.log('kasnije')} color="blue" />
      </div>
    </>
  );
};

export default Users;
