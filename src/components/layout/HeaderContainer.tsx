import Title from "../common/Title";
import SearchFilterTab from "../common/SearchFilterTab";
import { HeaderContainerProps } from "../../utils/types";

const HeaderContainer = ({
  title,
  isVisible,
  tabOptions,
  sortOptions,
}: HeaderContainerProps) => {
  return (
    <header className="flex justify-between py-8">
      <Title title={title} />
      {isVisible && (
        <SearchFilterTab tabOptions={tabOptions} sortOptions={sortOptions} />
      )}
    </header>
  );
};

export default HeaderContainer;
