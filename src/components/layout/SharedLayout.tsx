import MainContainer from "./MainContainer";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="w-full">
        <Navigation />
        <MainContainer>
          <Outlet />
        </MainContainer>
      </div>
    </>
  );
};

export default SharedLayout;
