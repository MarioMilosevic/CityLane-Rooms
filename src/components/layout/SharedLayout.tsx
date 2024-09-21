import MainContainer from "./MainContainer";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const SharedLayout = ({
  handleThemeSwitch,
  theme
}: {
    handleThemeSwitch: () => void;
  theme:string
}) => {
  return (
    <>
      <Toaster />
      <Sidebar />
      <div className="w-full bg-neutral-100 dark:bg-slate-700">
        <Navigation handleThemeSwitch={handleThemeSwitch} theme={theme} />
        <MainContainer>
          <Outlet />
        </MainContainer>
      </div>
    </>
  );
};

export default SharedLayout;
