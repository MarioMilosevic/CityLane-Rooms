import HeaderContainer from "../components/layout/HeaderContainer";
import InputField from "../components/layout/InputField";
import { userFields } from "../utils/constants";
import TableContainer from "../components/layout/Table/TableContainer";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
const Users = () => {
  return (
    <>
      <HeaderContainer isVisible={false} title={"Create a new user"} />
      <TableContainer>
        {userFields.map((field) => (
          <InputField key={field.id} {...field} />
        ))}
      </TableContainer>
      <div className="w-full flex justify-end gap-4 pr-4">
        <PrimaryActionButton color="white">Cancel</PrimaryActionButton>
        <PrimaryActionButton color="blue">Create new user</PrimaryActionButton>
      </div>
    </>
  );
};

export default Users;
