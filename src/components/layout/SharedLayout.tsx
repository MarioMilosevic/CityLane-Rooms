import MainContainer from "./MainContainer";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import { SharedLayoutProps } from "src/types/types";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { retrieveUser } from "src/api/AccountApi";
import { Navigate } from "react-router";
import Footer from "./Footer";

const SharedLayout = ({
  handleThemeSwitch,
  theme,
  user,
  setUser,
}: SharedLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

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
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <div className="w-full">
        <Navigation
          handleThemeSwitch={handleThemeSwitch}
          theme={theme}
          user={user}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <MainContainer
          isSidebarOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
        >
          <Outlet />
          <Footer />
        </MainContainer>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default SharedLayout;
