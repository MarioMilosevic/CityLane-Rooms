import HeaderContainer from "../components/layout/HeaderContainer";
import InputField from "../components/layout/InputField";
import { userFields } from "../utils/constants";
const Users = () => {
  return (
    <>
      <HeaderContainer isVisible={false} title={"Create a new user"} />
      {userFields.map((field) => <InputField key={field.id} {...field} />)}
    </>
  );
};

export default Users;
