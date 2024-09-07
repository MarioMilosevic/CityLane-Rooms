import { MainContainerProps } from "../../types/types";

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <main className="bg-neutral-100 px-24 min-h-screen">{children}</main>
  );
};

export default MainContainer;
