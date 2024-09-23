import { SharedLayoutProps } from "src/types/types";
import MainContainer from "./MainContainer";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { retrieveUser } from "src/api/AccountApi";
import LoadingSpinner from "../common/LoadingSpinner";

const SharedLayout = ({
  handleThemeSwitch,
  theme,
  user,
  setUser
}: SharedLayoutProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const retrieveUserInfo = async () => {
      try {
        setLoading(true);
        const user = await retrieveUser();
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error("Unexpected error occurred", error);
      } finally {
        setLoading(false);
      }
    };

    retrieveUserInfo();
  }, [setUser]);

  if(loading || !user) return <LoadingSpinner/>

  return (
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
  );
};

export default SharedLayout;
