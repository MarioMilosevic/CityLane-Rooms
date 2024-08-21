import Title from "../common/Title";
import { filterTabs } from "../../utils/constants";
import FilterTab from "../common/FilterTab";
import { useState } from "react";
import SearchFilterTab from "../common/SearchFilterTab";

const HeaderContainer = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <header className="flex justify-between py-8 border-black border">
      <Title title="All rooms" />
      {isVisible && <SearchFilterTab />}
    </header>
  );
};

export default HeaderContainer;
