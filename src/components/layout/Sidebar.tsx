import roomHubLogo from "../../assets/images/roomhub icon.jpg";
import { useState } from "react";
import { links } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import Title from "../common/Title";
import Link from "../common/Link";

const Sidebar = () => {
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const navigate = useNavigate();

  const clickHandler = (path: string, index: number) => {
    setActivePageIndex(index);
    navigate(`/${path}`);
  };
  return (
    <aside className="bg-neutral-50 w-[200px] flex flex-col border-r border-neutral-200">
      <img src={roomHubLogo} alt={roomHubLogo} className="w-full pb-6" />
      <Title title="RoomHub" />
      <div className="flex flex-col pl-2 pt-6">
        {links.map((link, index) => (
          <Link
            key={index}
            link={link}
            index={index}
            isSelected={activePageIndex === index ? true : false}
            clickHandler={() => clickHandler(link.heading, index)}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
