import HeadingContainer from "src/components/layout/HeadingContainer";
import UpdateUserForm from "src/components/layout/UpdateUserForm";
import UpdateUserPasswordForm from "src/components/layout/UpdateUserPasswordForm";
// import { useEffect } from "react";
// import { retrieveUser } from "src/api/AccountApi";
const Account = () => {
  // useEffect(() => {
  //   const retrieveUserInfo = async () => {
  //     const user = await retrieveUser()
  //     console.log(user)
  //   }
  //   retrieveUserInfo()
  // }, [])
  return (
    <>
      <HeadingContainer title="Update your account" />
      <UpdateUserForm />
      <UpdateUserPasswordForm />
    </>
  );
};

export default Account;
