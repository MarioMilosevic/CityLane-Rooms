import { SharedLayoutProps } from "src/types/types";
import MainContainer from "./MainContainer";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { retrieveUser } from "src/api/AccountApi";
import { Navigate } from "react-router";

const SharedLayout = ({
  handleThemeSwitch,
  theme,
  user,
  setUser,
}: SharedLayoutProps) => {
  useEffect(() => {
    const retrieveUserInfo = async () => {
      try {
        const user = await retrieveUser();
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error("Unexpected error occurred", error);
      }
    };
    retrieveUserInfo();
  }, [setUser]);

  return user?.id ? (
    <>
      <Toaster />
      <Sidebar />
      <div className="w-full bg-neutral-100 dark:bg-slate-700">
        <Navigation
          handleThemeSwitch={handleThemeSwitch}
          theme={theme}
          user={user}
        />
        <MainContainer>
          <Outlet />
        </MainContainer>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default SharedLayout;

// return (
//   <>
//     <Toaster />
//     <Sidebar />
//     <div className="w-full bg-neutral-100 dark:bg-slate-700">
//       <Navigation
//         handleThemeSwitch={handleThemeSwitch}
//         theme={theme}
//         user={user}
//       />
//       <MainContainer>
//         <Outlet />
//       </MainContainer>
//     </div>
//   </>
// );
