import Title from "../common/Title";
import { HeadingContainerProps } from "../../types/types";

const HeadingContainer = ({
  title,
  children
}: HeadingContainerProps) => {
  return (
    <header className="flex justify-between py-8">
      <Title title={title} />
      {children}
    </header>
  );
};

export default HeadingContainer;
