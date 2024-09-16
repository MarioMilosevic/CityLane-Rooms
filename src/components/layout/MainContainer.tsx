import { MainContainerProps } from "../../types/types";

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <main className="bg-neutral-100 pl-24 min-h-screen dark:bg-slate-700">{children}</main>
  );
};

export default MainContainer;
