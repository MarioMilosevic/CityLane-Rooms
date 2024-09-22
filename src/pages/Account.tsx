import HeadingContainer from "src/components/layout/HeadingContainer";
import UpdateUserForm from "src/components/layout/UpdateUserForm";
import UpdateUserPasswordForm from "src/components/layout/UpdateUserPasswordForm";
const Account = () => {
  return (
    <>
      <HeadingContainer title="Update your account" />
      <UpdateUserForm />
      <UpdateUserPasswordForm />
    </>
  );
};

export default Account;
