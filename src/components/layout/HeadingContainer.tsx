import Title from "../common/Title";
import SearchFilterTab from "../common/SearchFilterTab";
import { HeadingContainerProps } from "../../utils/types";

const HeadingContainer = ({
  title,
  isVisible,
  tabOptions,
  sortOptions,
}: HeadingContainerProps) => {
  return (
    <header className="flex justify-between py-8">
      <Title title={title} />
      {isVisible && (
        <SearchFilterTab tabOptions={tabOptions} sortOptions={sortOptions} />
      )}
    </header>
  );
};

export default HeadingContainer;
