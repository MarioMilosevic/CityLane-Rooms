import Title from "../common/Title";
import SearchFilterTab from "../common/SearchFilterTab";
import { HeaderContainerProps } from "../../utils/types";

const HeaderContainer = ({ isVisible, tabOptions, sortOptions }:HeaderContainerProps) => {
  return (
    <header className="flex justify-between py-8 border-black border">
      <Title title="All rooms" />
      {isVisible && <SearchFilterTab tabOptions={tabOptions} sortOptions={sortOptions}/>}
    </header>
  );
};

export default HeaderContainer;
