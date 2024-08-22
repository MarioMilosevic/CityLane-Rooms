import { MainContainerProps } from "../../utils/types";

const MainContainer = ({ children }: MainContainerProps) => {
  return <main className="w-full bg-neutral-100 pl-24 min-h-screen">{children}</main>;
};

export default MainContainer;
