import { MainContainerProps } from "../../types/types";

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <main className="bg-neutral-100 px-12 min-h-screen dark:bg-slate-700">{children}</main>
  );
};

export default MainContainer;
