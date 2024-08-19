import FilterTab from "../common/FilterTab";
import { filterTabs } from "../../utils/constants";
import { useState } from "react";
const Main = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <main className="bg-neutral-100 border border-black pl-24 pt-8">
      <div className="flex justify-between border border-black">
        <h1 className="text-xl font-medium">All rooms</h1>
        <div className="border border-black flex items-center gap-2 text-sm">
          {filterTabs.map((tab, index) => (
            <FilterTab
              color={activeIndex === index ? "blue" : "white"}
              buttonHandler={() => setActiveIndex(index)}
            >
              {tab}
            </FilterTab>
          ))}
          <select>
            <option value="">Sort by name (A-Z)</option>
          </select>
        </div>
      </div>
    </main>
  );
};

export default Main;
