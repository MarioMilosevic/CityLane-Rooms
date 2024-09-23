import HeadingContainer from "src/components/layout/HeadingContainer";
import UpdateUserForm from "src/components/layout/UpdateUserForm";
import UpdateUserPasswordForm from "src/components/layout/UpdateUserPasswordForm";
import { AccountProps } from "src/types/types";
const Account = ({setUser}:AccountProps) => {
  return (
    <>
      <HeadingContainer title="Update your account" />
      <UpdateUserForm setUser={setUser} />
      <UpdateUserPasswordForm />
    </>
  );
};

export default Account;
