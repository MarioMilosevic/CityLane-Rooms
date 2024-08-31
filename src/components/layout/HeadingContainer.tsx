import Title from "../common/Title";
import SearchFilterTab from "../common/SearchFilterTab";
import { HeadingContainerProps } from "../../types/types";

const HeadingContainer = ({
  title,
  isVisible,
  tabOptions,
  sortOptions,
  activeIndex
}: HeadingContainerProps) => {
  return (
    <header className="flex justify-between py-8">
      <Title title={title} />
      {isVisible && (
        <SearchFilterTab tabOptions={tabOptions} sortOptions={sortOptions} activeIndex={activeIndex } />
      )}
    </header>
  );
};

export default HeadingContainer;
