import Title from "../common/Title";
import { HeadingContainerProps } from "../../types/types";

const HeadingContainer = ({ title, children }: HeadingContainerProps) => {
  return (
    <header className="flex lg:gap-0 justify-between lg:py-8 pt-8 py-12 relative">
      <Title title={title} position="left" />
      {children}
    </header>
  );
};

export default HeadingContainer;
