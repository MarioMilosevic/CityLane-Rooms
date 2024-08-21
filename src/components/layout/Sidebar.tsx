import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { links } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import Link from "../common/Link";

const Sidebar = () => {
  const [activePageIndex, setActivePageIndex] = useState<number>(1);
  const navigate = useNavigate();

  const clickHandler = (path: string, index:number) => {
    setActivePageIndex(index)
    navigate(`/${path}`);
  };
  return (
    <aside className="bg-neutral-50 w-[200px] flex flex-col border-r border-neutral-200">
      <img src={logo} alt="Logo" className="w-full" />
      <h1 className="text-2xl tracking-wide flex justify-center pb-10">
        EchoStay
      </h1>
      <div className="flex flex-col pl-2">
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
